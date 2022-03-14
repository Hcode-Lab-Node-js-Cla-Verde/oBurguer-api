
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation.id';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Injectable()
export class IngredientTypeService {

    constructor(private prismaService: PrismaService) {} 

    async create(typeId: number, {
        name,
    }: CreateIngredientsDto) {

       const ingredientType = this.prismaService.create({
            data: {
                name: name,
                typeId: isValidNumber(typeId)
            }
       })
        return ingredientType;
    }

    async findAll() {
        return this.prismaService.ingredientType.findAll();
    }

    async findOne(id: number) {
        return this.prismaService.ingredientType.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async update(id: number) {
        return this.prismaService.ingredientType.update({
            where: {
                id: isValidNumber(id),
            }
        })
    }
    
    async remove(id: number) {
        return this.prismaService.ingredientType.delete({
            where: {
                id: isValidNumber(id),
            }
        })
     }
}
