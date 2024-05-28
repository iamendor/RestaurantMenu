import { IsNotEmpty } from 'class-validator';

export class CreateEtel {
  @IsNotEmpty()
  name: string;
  allergenek: number[];
}

export class UpdateEtel {
  name?: string;
  allergenek?: UpdateAllergenOnEtel[];
}

export class UpdateAllergenOnEtel {
  @IsNotEmpty()
  action: 'ADD' | 'REMOVE';
  @IsNotEmpty()
  id: number;
}
