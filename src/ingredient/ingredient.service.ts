import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
@Injectable()
export class IngredientService {

  constructor(
    private prisma: PrismaService,
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

  async create(typeId: number,
    { name, price, available }: CreateIngredientsDto
  ) {
    price = isValidNumber(price);
    available = isValidNumber(available);

    const ingredients = await this.prisma.ingredient.create({
      data: {
        name,
        price,
        available,
        typeId,
      },
    });
   
    return ingredients;
  }

  async remove(id: number) {
    return this.prisma.ingredient.delete({
      where: {
        id: isValidNumber(id),
      },
    });
  }
}
 