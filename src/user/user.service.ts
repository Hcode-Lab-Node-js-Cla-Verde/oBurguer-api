import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  async findById(id: number, hash = false) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        persons: true,
      },
    });

    if (!hash) {
      delete user.password;
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        persons: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    return user;
  }

  async create({
    name,
    email,
    password
  }: {
    name: string,
    email: string,
    password: string
  }) {
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
    } catch (error) { }

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const userCreated = await this.prismaService.user.create({
      data: {
        persons: {
          create: {
            name,
          },
        },
        email,
        password: bcrypt.hashSync(password, 10),
      },
      include: {
        persons: true,
      },
    });

    delete userCreated.password;

    return userCreated;
  }

  async update(
    id: number,
    {
      name,
      email,
      photo,
    }: {
      name?: string;
      email?: string;
      photo?: string;
    },
  ) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is not a number');
    }

    const dataPerson = {} as Prisma.PersonUpdateInput;
    const dataUser = {} as Prisma.UserUpdateInput;

    if (name) {
      dataPerson.name = name;
    }

    if (email) {
      dataUser.email = email;
    }

    if (photo) {
      dataUser.photo = photo;
    }

    const user = await this.findById(id);

    if (dataPerson) {
      await this.prismaService.person.update({
        where: {
          id: user.personId,
        },
        data: dataPerson,
      });
    }

    if (dataUser) {
      await this.prismaService.user.update({
        where: {
          id,
        },
        data: dataUser,
      });
    }

    return this.findById(id);
  }
}
