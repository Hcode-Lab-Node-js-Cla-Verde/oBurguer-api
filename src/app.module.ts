import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [
    PrismaModule, UserModule, OrderModule, IngredientsModule],
  controllers: [AppController],
})
export class AppModule { }
