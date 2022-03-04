import { AddressModule } from './addresses/address.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AddressModule, PrismaModule, UserModule],
  controllers: [AppController],
})
export class AppModule { }
