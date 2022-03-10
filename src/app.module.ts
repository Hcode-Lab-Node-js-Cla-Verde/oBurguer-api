import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AddressModule, PrismaModule, UserModule, OrderModule],
  controllers: [AppController],
})
export class AppModule { }
