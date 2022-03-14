import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { AppController } from './app.controller';
import { AddressModule } from './address/address.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    AddressModule,
    IngredientsModule,
    OrderModule,
    MailModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
