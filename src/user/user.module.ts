import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { PasswordService } from './password.service';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
