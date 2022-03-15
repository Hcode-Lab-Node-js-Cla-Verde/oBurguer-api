import { AuthModule } from './auth/auth.module';
import { Module } from "@nestjs/common";
import { AddressModule } from "./address/address.module";
import { AppController } from "./app.controller";
import { IngredientModule } from "./ingredient/ingredient.module";
import { MailModule } from "./mail/mail.module";
import { OrderModule } from "./order/order.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    AddressModule,
    IngredientModule,
    OrderModule,
    MailModule,
    PrismaModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
