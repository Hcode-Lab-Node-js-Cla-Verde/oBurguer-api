import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Get('/user/:id')
  findByUser(@Param('id') id) {
    return this.orderService.findByUser(+id);
  }

  @Post()
  create(@Body() body) {
    return this.orderService.create(body);
  }

  @Put(':id/update-status')
  updateStatus(@Param('id') id, @Body('statusId') statusId) {
    return this.orderService.updateStatus({ id: +id, statusId: +statusId });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
