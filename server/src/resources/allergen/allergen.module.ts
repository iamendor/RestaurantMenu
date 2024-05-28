import { Module } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { AllergenController } from './allergen.controller';

@Module({
  controllers: [AllergenController],
  providers: [AllergenService],
})
export class AllergenModule {}
