import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientsDto } from './dto/create-ingredients.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  async list() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.ingredientService.findOne(+id);
  }

  @Post()
  async create(
    @Body() data: CreateIngredientsDto,
    @Body() user,
  ) {
    return this.ingredientService.create(user.type_id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return this.ingredientService.remove(+id);
  }
}