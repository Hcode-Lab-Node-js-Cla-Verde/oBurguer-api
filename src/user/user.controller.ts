// import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   findByEmail(@Query('email') email: string) {
//     return this.userService.findByEmail(email);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.userService.findById(+id);
//   }

//   @Put(':id')
//   update(
//     @Param('id') id,
//     @Body('name') name,
//     @Body('email') email,
//   ) {
//     return this.userService.update(+id, { name, email });
//   }
// }
