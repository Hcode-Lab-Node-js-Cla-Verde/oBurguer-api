import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { isValidNumber } from 'src/utils';
import { OrderStatusService } from './order-status.service';

@Injectable()
export class OrderService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private orderStatusService: OrderStatusService,
  ) {}

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

  async findByUser(id: number) {
    id = isValidNumber(id);

    return this.prismaService.order.findMany({
      where: {
        userId: id,
      },
      include: {
        orderItems: true,
        orderStatus: true,
      },
    });
  }

  async create({ userId, items }) {
    userId = isValidNumber(userId);

    if (!items.length) {
      throw new BadRequestException('Order must have at least one item');
    }

    items.forEach(item => {
      if (!item.ingredients.length) {
        throw new BadRequestException('Item must have at least one ingredient');
      }
    });

    // Checks if user exists
    await this.userService.findById(userId);

    const order = await this.prismaService.order.create({
      data: {
        statusId: 1,
        userId,
        total: 10.2, // TODO: Count order total
      },
    });

    for (const item of items) {
      const orderItem = await this.prismaService.orderItem.create({
        data: {
          orderId: order.id,
          name: item.name,
        },
      });

      for (const ingredientId of item.ingredients) {
        await this.prismaService.itemIngredient.create({
          data: {
            ingredientId,
            orderItemId: orderItem.id,
            ingredient_price: 10.00,
          },
        })
      }
    }

    return this.findOne(order.id);
  }

  async updateStatus({ id, statusId }) {
    id = isValidNumber(id);
    statusId = isValidNumber(statusId, 'StatusId is invalid');

    await this.orderStatusService.findOne(statusId);

    await this.prismaService.order.update({
      where: { id },
      data: {
        statusId,
      },
    });

    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
