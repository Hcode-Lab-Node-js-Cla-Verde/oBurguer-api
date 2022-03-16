import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  findByUser(@Param('id') id) {
    return this.orderService.findByUser(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put(':id/update-status')
  updateStatus(@Param('id') id, @Body('statusId') statusId) {
    return this.orderService.updateStatus({ id: +id, statusId: +statusId });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
