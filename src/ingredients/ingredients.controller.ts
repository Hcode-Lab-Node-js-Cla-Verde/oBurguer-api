import { Body, Controller, Post, Get, Delete, Param, Patch,  } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Controller("ingredients")
export class IngredientsController {
    constructor(private ingredientService: IngredientsService) {}

    @Get()
    async list() {
        return this.ingredientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.ingredientService.findOne(+id);
    }

    @Post()
    async createIngredient(
        @Body() data: CreateIngredientsDto,
        @Body() user,
    ) {
        return this.ingredientService.create(user.type_id, data);
    }

    @Post(':id')
    async update(){
        return this.ingredientService.update()
    }

    @Delete(':id')
    async remove(@Param('id') id: number,
    ) {
        return this.ingredientService.remove(id);
    }
}
