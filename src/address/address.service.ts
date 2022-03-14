import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'src/utils/validate-number';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) { }

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

    async findOnePerson(personId: number) {
        try {
            personId = isValidNumber(personId)
            return this.prisma.address.findMany({
                where: {
                    personId,
                }
            });
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(data: CreateAddressDto) {

        data.personId = Number(data.personId);

        return this.prisma.address.create({
            data
        });

    }

    async update(id: number, dataUpdate: UpdateAddressDto) {

        return this.prisma.address.update({
            data: dataUpdate,
            where: {
                id: isValidNumber(id),
            },
        });

    }

    async delete(id: number) {
        return this.prisma.address.delete({
            where: {
                id: isValidNumber(id),
            },
        });

    }
}
