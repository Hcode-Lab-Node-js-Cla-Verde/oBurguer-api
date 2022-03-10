import { Body, Controller, Post } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller("ingredients")
export class IngredientsController {
    constructor(private ingredientService: IngredientsService) {}

    // @Post
    // create(@Body() )
}
