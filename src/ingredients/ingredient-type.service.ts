import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Injectable()
export class IngredientTypeService {

  constructor(private prismaService: PrismaService) {} 

  create(id: number,
    { name }: CreateIngredientsDto
  ) {
    return this.prismaService.ingredientType.create({
      data: {
        name: name,
        id: isValidNumber(id)
      },
    });
  }

  findAll() {
    return this.prismaService.ingredientType.findMany();
  }

  findOne(id: number) {
    return this.prismaService.ingredientType.findUnique({
      where: {
        id: isValidNumber(id),
      },
    });
  }

  remove(id: number) {
    return this.prismaService.ingredientType.delete({
      where: {
        id: isValidNumber(id),
      },
    });
  }
}
