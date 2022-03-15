import { IngredientsService } from './ingredients.service';
import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngredientTypeService } from './ingredient-type.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    IngredientsController,
  ],
  providers: [
    IngredientsService,
    IngredientTypeService
  ],
})
export class IngredientsModule {}
