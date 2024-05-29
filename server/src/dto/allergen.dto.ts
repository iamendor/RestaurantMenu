import { IsNotEmpty } from 'class-validator';

export class CreateAllergen {
  @IsNotEmpty()
  name: string;
}
