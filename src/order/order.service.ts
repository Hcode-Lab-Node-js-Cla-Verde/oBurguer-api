import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { isValidNumber } from 'src/utils';

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
  
  async findOne(id: number) {
    id = isValidNumber(id);

    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        orderStatus: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    return order;
  }

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }


  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
