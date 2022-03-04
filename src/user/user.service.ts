import { BadRequestException, Injectable } from '@nestjs/common';
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

  update(id: number) {
    return `This action updates a #${id} user`;
  }
}
