import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Injectable()
export class PasswordService {
  constructor(
    private mailService: MailService,
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  async checkPassord(id: number, password: string) {
    const user = await this.userService.findById(id, true);

    const checked = await bcrypt.compare(password, user.password);

    if (!checked) {
      throw new UnauthorizedException("Email or password is incorrect");
    }

    return true;
  }

  async updatePassword(id: number, password: string) {
    await this.userService.findById(id);

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: bcrypt.hashSync(password, 10),
      },
      include: {
        persons: true,
      },
    });

    delete userUpdated.password;

    await this.mailService.send({
      to: userUpdated.email,
      subject: 'Senha alterada com sucesso!',
      template: 'reset-password-confirm',
      data: {
        name: userUpdated.persons.name,
      },
    });

    return userUpdated;
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    if (!newPassword) {
      throw new BadRequestException('New password is required');
    }

    await this.checkPassord(id, currentPassword);

    return this.updatePassword(id, newPassword);
  }
}
