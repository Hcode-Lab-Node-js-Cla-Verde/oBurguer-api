import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OrderStatusService } from './order-status.service';
import { isValidNumber } from 'src/utils';
import orderQuery from './queries/select-order';

@Injectable()
export class OrderService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private orderStatusService: OrderStatusService,
  ) {}

  findAll() {
    return this.prismaService.order.findMany({
      select: orderQuery,
    });
  }
  
  async findOne(id: number) {
    id = isValidNumber(id);

    const order = await this.prismaService.order.findUnique({
      where: { id },
      select: orderQuery,
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
      select: orderQuery,
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

  async remove(id: number) {
    id = isValidNumber(id);

    const { orderStatus } = await this.findOne(id);

    if (orderStatus.id !== 1) {
      throw new BadRequestException('This order cannot be removed because is has been approved already');
    }

    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
