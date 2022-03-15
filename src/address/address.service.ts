import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validate-number';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) { }

    async isValidPerson(id: number, personId: number) {

        personId = isValidNumber(personId);

        const address = await this.findOne(isValidNumber(id));

        if (address.personId !== personId) {
            throw new BadRequestException("Operation is invalid.");
        }

        return true;

    }

    async findAll() {
        return this.prisma.address.findMany();
    }

    async findOne(id: number) {
        try {
            return this.prisma.address.findUnique({
                where: {
                    id: isValidNumber(id),
                },
            });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findByPerson(personId: number) {
        return this.prisma.address.findMany({
            where: {
                personId: isValidNumber(personId),
            },
        });
    }

    async create(personId: number, data: CreateAddressDto) {

        personId = Number(personId);

        if (isNaN(personId)) {
            throw new NotFoundException("User not found.");
        }

        return this.prisma.address.create({
            data: {
                ...data,
                personId,
            },
        });

    }

    async update(id: number, personId: number, dataUpdate: UpdateAddressDto) {

        await this.isValidPerson(id, personId);

        return this.prisma.address.update({
            data: dataUpdate,
            where: {
                id: isValidNumber(id),
            },
        });

    }

    async delete(id: number, personId: number) {

        await this.isValidPerson(id, personId);

        return this.prisma.address.delete({
            where: {
                id: isValidNumber(id),
            },
        });

    }
}
