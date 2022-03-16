import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientTypeService } from './ingredient-type.service';
@Injectable()
export class IngredientService {

  constructor(
    private prisma: PrismaService,
    private ingredientType: IngredientTypeService,
  ) {}

  async findAll() { 
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: number) {
    return this.prisma.ingredient.findUnique({
      where: {
        id: isValidNumber(id),
      },
    });
  }

  async create({ name, price, available, typeId }: CreateIngredientDto) {

    const ingredientType = await this.ingredientType.findOne(typeId);

    if (!ingredientType) {
      throw new BadRequestException('Ingredient type not found');
    }

    return await this.prisma.ingredient.create({
      data: {
        name,
        price: isValidNumber(price),
        available: isValidNumber(available),
        typeId: isValidNumber(typeId),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.ingredient.delete({
      where: {
        id: isValidNumber(id),
      },
    });
  }
}
 