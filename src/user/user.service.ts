import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  async findOne(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        person: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    delete user.password;

    return user;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: {
        person: true,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    delete user.password;

    return user;
  }

  async create({ name, email, password }: { name: string, email: string, password: string}) {
    if (!name) {
      throw new BadRequestException('Name is required');
    }
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!password) {
      throw new BadRequestException('Password is required');
    }

    let user = null;

    try {
      user = await this.findByEmail(email);
    } catch (error) {}

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const userCreated = await this.prismaService.user.create({
      data: {
        person: {
          create: {
            name,
          },
        },
        email,
        password: bcrypt.hashSync(password, 10),
      },
      include: {
        person: true,
      },
    });

    delete userCreated.password;

    return userCreated;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }
}
