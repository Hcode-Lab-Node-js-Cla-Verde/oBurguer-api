import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) {}

  async findById(id: number) {
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

  async update(id: number, { name, email }:{ name?: string, email?: string }) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is not a number');
    }

    const personData = {} as Prisma.PersonUpdateInput;
    const userData = {} as Prisma.UserUpdateInput;

    if (name) {
      personData.name = name;
    }

    if (email) {
      try {
        await this.findByEmail(email);
      }
      catch (error) {
        userData.email = email;
      }      
    }

    const user = await this.findById(id);

    if (personData) {
      await this.prismaService.person.update({
        where: {
          id: user.personId,
        },
        data: personData,
      });
    }
    if (userData) {
      await this.prismaService.user.update({
        where: {
          id,
        },
        data: userData,
      });  
    }
    
    return this.findById(id);
  }
}
