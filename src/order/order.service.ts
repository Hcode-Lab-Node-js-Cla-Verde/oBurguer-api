import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {

  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.order.findMany({
      include: {
        orderItems: true,
        orderStatus: true,
      },
    });
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
