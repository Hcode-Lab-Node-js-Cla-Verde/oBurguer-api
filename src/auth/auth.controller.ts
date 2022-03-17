import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PasswordService } from 'src/user/password.service';
import { User } from 'src/user/user.decorator';
import { UserService } from 'src/user/user.service';
import { Auth } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('Auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private passwordService: PasswordService
  ) {}

  @UseGuards(AuthGuard)
  @Get('online')
  async me(@Auth() auth, @User() user) {
    return {
      auth,
      user,
    };
  }

  @Post()
  async verifyEmail(@Body('email') email) {
    await this.userService.findByEmail(email);

    return { exists: true };
  }

  @Post('register')
  async register(@Body() data: CreateUserDto) {

    const user = await this.userService.create(data);

    const token = await this.authService.findToken(user.id);

    return { user, token };
  }

  @Post('login')
  async login(@Body('email') email, @Body('password') password) {
    return this.authService.login({ email, password });
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async profile(@User() user, @Body() body) {

    return this.userService.update(user.id, body);
  }

  @UseGuards(AuthGuard)
  @Put('password')
  async changePassword(
    @Body('currentPassword') currentPassword,
    @Body('newPassword') newPassword,
    @User('id') id,
  ) {
    return this.passwordService.changePassword(id, currentPassword, newPassword);
  }

  @Post('forget')
  async forget(@Body('email') email) {
    return this.authService.recovery(email);
  }

  @Post('password-reset')
  async resetPassword(
    @Body('password') password: string,
    @Body('token') token: string,
  ) {
    return this.authService.reset({ password, token });
  }
}
