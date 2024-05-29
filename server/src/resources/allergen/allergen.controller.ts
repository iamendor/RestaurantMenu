import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { CreateAllergen } from 'src/dto/allergen.dto';

@Controller('allergen')
export class AllergenController {
  constructor(private readonly allergenService: AllergenService) {}

  @Post('')
  create(@Body() body: CreateAllergen) {
    return this.allergenService.create(body);
  }

  @Get()
  list() {
    return this.allergenService.list();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.allergenService.find(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateAllergen) {
    return this.allergenService.update({ id, data: body });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.allergenService.delete(id);
  }
}
