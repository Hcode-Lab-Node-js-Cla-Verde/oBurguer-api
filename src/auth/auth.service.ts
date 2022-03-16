import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/user/password.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private mailService: MailService,
  ) {}

  async findToken(userId: number) {
    const { email, photo, id, persons } = await this.userService.findById(userId);
    const { name } = persons;

    return this.jwtService.sign({ name, email, photo, id });
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userService.findByEmail(email);

    await this.passwordService.checkPassord(user.id, password);

    const token = await this.findToken(user.id);

    return { token };
  }

  async decodeToken(token: string) {
    try {
      await this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }

    return this.jwtService.decode(token);
  }

  async recovery(email: string) {
    const { id, persons } = await this.userService.findByEmail(email);
    const { name } = persons;

    const token = await this.jwtService.sign(
      { id },
      {
        expiresIn: 30 * 60,
      },
    );

    await this.prisma.passwordRecovery.create({
      data: {
        userId: id,
        token,
      },
    });

    await this.mailService.send({
      to: email,
      subject: 'Esqueci a senha',
      template: 'forget',
      data: {
        name,
        url: `https://time-azul-hburger.web.app/forget.html?token=${token}`,
      },
    });

    return { success: true };
  }

  async reset({ password, token }: { password: string; token: string }) {
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    try {
      await this.jwtService.verify(token);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    const passwordRecovery = await this.prisma.passwordRecovery.findFirst({
      where: {
        token,
        resetAt: null,
      },
    });

    if (!passwordRecovery) {
      throw new BadRequestException('Token used');
    }

    await this.prisma.passwordRecovery.update({
      where: {
        id: passwordRecovery.id,
      },
      data: {
        resetAt: new Date(),
      },
    });

    return this.passwordService.updatePassword(passwordRecovery.userId, password);
  }
}
