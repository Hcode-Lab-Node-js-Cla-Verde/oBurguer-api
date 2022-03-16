import { IsNotEmpty } from "class-validator";

export class CreateIngredientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  typeId: number;

  @IsNotEmpty()
  available: number;
}
