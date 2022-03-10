import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderStatusService {

  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.orderStatus.findMany();
  }

  findOne(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const orderStatus = this.prismaService.orderStatus.findUnique({
      where: { id },
    });

    if (!orderStatus) {
      throw new BadRequestException('Order status not found');
    }

    return orderStatus;
  }
}