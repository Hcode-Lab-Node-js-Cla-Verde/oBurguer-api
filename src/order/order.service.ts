import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OrderStatusService } from './order-status.service';
import { isValidNumber } from 'src/utils';
import { CreateOrderDto } from './dto/create-order.dto';
import orderQuery from './queries/select-order';
import { IngredientService } from 'src/ingredient/ingredient.service';

@Injectable()
export class OrderService {

  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private orderStatusService: OrderStatusService,
    private ingredientService: IngredientService,
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

  async create(userId, { items }: CreateOrderDto) {
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
        total: 0,
      },
    });

    let orderTotal = 0;
    
    for (const item of items) {
      const orderItem = await this.prismaService.orderItem.create({
        data: {
          orderId: order.id,
          name: item.name,
        },
      });

      for (const ingredientId of item.ingredients) {
        const ingredient = await this.ingredientService.findOne(ingredientId);

        if (!ingredient) {
          throw new BadRequestException(`Ingredient of id #${ingredientId} not found`);
        }

        await this.prismaService.itemIngredient.create({
          data: {
            ingredientId,
            orderItemId: orderItem.id,
            ingredient_price: +ingredient.price,
          },
        })

        orderTotal += +ingredient.price;
      }
    }

    return this.prismaService.order.update({
      where: { id: order.id },
      data: {
        total: orderTotal,
      },
      select: orderQuery,
    });
  }

  async updateStatus({ id, statusId }) {
    id = isValidNumber(id);
    statusId = isValidNumber(statusId, 'StatusId is invalid');

    await this.orderStatusService.findOne(statusId);

    // Checks if order exists
    await this.findOne(id);

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
      throw new BadRequestException('This order cannot be removed because is has already been approved');
    }

    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
