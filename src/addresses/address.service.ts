import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.address.findMany();
    }
}
