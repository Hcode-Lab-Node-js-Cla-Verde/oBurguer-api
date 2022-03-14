import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
