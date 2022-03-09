import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("addresses")
export class AddressController {
    constructor(private addressService: AddressService) { }

    @Get()
    async listAll() {
        return await this.addressService.findAll();
    }

    @Get(':id')
    async listById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.addressService.findOne(id);
    }

    @Post()
    async createAddress(
        @Body() data: CreateAddressDto
        ) {
        return this.addressService.create(data);
    }

    @Patch(':id')
    async updateAddress(
        @Body() data: UpdateAddressDto,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.addressService.update(id, data);
    }

    @Delete(':id')
    async deleteAddress(
        @Param('id', ParseIntPipe) id: number,
    ) {
            return this.addressService.delete(id);
    }
}