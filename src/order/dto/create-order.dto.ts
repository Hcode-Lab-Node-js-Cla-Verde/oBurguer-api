import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;
  
  @IsNotEmpty()
  items: { name: string, ingredients: number[]}[];
}
