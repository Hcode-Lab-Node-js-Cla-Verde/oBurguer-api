import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validation.id';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';
import { IngredientTypeService } from './ingredient-type.service';

@Injectable()
export class IngredientsService {
    
    constructor(
        private prisma: PrismaService,
        private ingredientType: IngredientTypeService
    ) {}


    async findAll() { 
        return this.prisma.ingredients.findMany()
    }

    async findOne(id: number) { 

        return this.prisma.ingredients.findUnique({
            where: {
                id: isValidNumber(id),
            }
        })
    }

    async create(type_id: number, {
        name,
        price,
        available
    }: CreateIngredientsDto) {
        price = isValidNumber(price);
        available = isValidNumber(available);

        const ingredients = await this.prisma.ingredients.create({
            data: {
                name,
                price,
                available,
                type_id
            }
        });
       
        console.log(ingredients, 'vazio')
        return ingredients;
    }

    async update() { 
        
    }

    async remove(id: number) {

        return this.prisma.ingredients.delete({
            where: {
                id: isValidNumber(id),
            },
        });
     }

}


