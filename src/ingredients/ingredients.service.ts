/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class IngredientsService {

    async findAll() {}

    async findOne(id: number) {}

    async create() {}

    async update() {}

    async delete(id: number) {}
    
}

 