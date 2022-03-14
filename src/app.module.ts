import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IngredientsModule } from './ingredients/ingredients.module';
// import { UserModule } from './user/user.module';

@Module({
    imports: [
        IngredientsModule,
        PrismaModule,
    ],
    controllers: [
        AppController
    ],
})
export class AppModule { }
