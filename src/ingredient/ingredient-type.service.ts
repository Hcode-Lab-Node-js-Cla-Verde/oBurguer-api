import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/';

@Injectable()
export class IngredientTypeService {

  constructor(private prismaService: PrismaService) {}

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
}
