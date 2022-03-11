import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { isValidNumber } from 'src/utils';

@Injectable()
export class OrderService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
