import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils';

@Injectable()
export class OrderStatusService {

  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.orderStatus.findMany();
  }

  async findOne(id: number) {
    id = isValidNumber(id);

    const orderStatus = await this.prismaService.orderStatus.findUnique({
      where: { id },
    });

    if (!orderStatus) {
      throw new BadRequestException('Order status not found');
    }

    return orderStatus;
  }
}