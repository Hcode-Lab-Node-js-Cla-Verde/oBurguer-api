import { Body, Controller, Post, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @UseGuards(AuthGuard)
  @Get()
  async list() {
    return this.ingredientService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id) {
    return this.ingredientService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create( @Body() data: CreateIngredientDto) {
    return this.ingredientService.create(data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id) {
    return this.ingredientService.remove(+id);
  }
}