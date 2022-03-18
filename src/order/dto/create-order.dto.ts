import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  items: { name: string, ingredients: number[]}[];
}
