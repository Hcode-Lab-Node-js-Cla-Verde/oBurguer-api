import { IngredientService } from './ingredient.service';
import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IngredientTypeService } from './ingredient-type.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule
  ],
  controllers: [
    IngredientController,
  ],
  providers: [
    IngredientService,
    IngredientTypeService
  ],
  exports: [IngredientService],
})
export class IngredientModule {}
