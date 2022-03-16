import { IngredientService } from './ingredient.service';
import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngredientTypeService } from './ingredient-type.service';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [
    IngredientController,
  ],
  providers: [
    IngredientService,
    IngredientTypeService
  ],
})
export class IngredientModule {}
