import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatusService } from './order-status.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [OrderController],
  providers: [OrderService, OrderStatusService],
})
export class OrderModule {}
