import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/user/user.decorator";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("addresses")
export class AddressController {
    constructor(private addressService: AddressService) { }
    
    @UseGuards(AuthGuard)
    @Get()
    async listAll() {
        return await this.addressService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('person')
    async listByPerson(@User() user) {
        return this.addressService.findByPerson(+user.personId);
    }
    
    @UseGuards(AuthGuard)
    @Get(':id')
    async listById(@Param('id', new ParseIntPipe()) id: number) {
        return await this.addressService.findOne(id);
    }
    @UseGuards(AuthGuard)
    @Post()
    async createAddress(
        @Body() data: CreateAddressDto,
        @User() user,
    ) {
        return this.addressService.create(user.personId, data);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateAddress(
        @Body() data: UpdateAddressDto,
        @Param('id', new ParseIntPipe()) id: number,
        @User() user,
    ) {
        return this.addressService.update(id, user.personId, data);
    }
    
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteAddress(
        @Param('id', new ParseIntPipe()) id: number,
        @User() user,
    ) {
        return this.addressService.delete(id, user.personId);
    }
}