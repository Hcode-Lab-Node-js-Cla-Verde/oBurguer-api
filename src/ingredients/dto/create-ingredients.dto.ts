import { IsNotEmpty } from "class-validator";

export class CreateIngredientsDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    available: number;
}
