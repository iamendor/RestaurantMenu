import { IsNotEmpty, Length } from 'class-validator';

export class CreateMenu {
  @IsNotEmpty()
  letter: 'A' | 'B' | 'C';
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  @Length(1)
  etelek: number[];
}

export class UpdateMenu {
  date?: Date;
  letter?: 'A' | 'B' | 'C';
  etelek: UpdateEtelOnMenu[] = [];
}

export class UpdateEtelOnMenu {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  action: 'ADD' | 'REMOVE';
}
