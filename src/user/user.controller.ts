import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() body,
  ) {
    return this.userService.update(id, body);
  }
}
