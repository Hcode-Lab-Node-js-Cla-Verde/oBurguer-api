import { Controller, Get } from "@nestjs/common";
import { AddressService } from "./address.service";

@Controller("addresses")
export class AddressController {
    constructor(private addressService: AddressService) { }

    @Get()
    async listAll() {
        return this.addressService.findAll();
    }
}