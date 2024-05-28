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
import { EtelService } from './etel.service';
import { CreateEtel, UpdateEtel } from 'src/dto/etel.dto';

@Controller('etel')
export class EtelController {
  constructor(private readonly etelService: EtelService) {}

  @Post()
  create(@Body() body: CreateEtel) {
    return this.etelService.create(body);
  }

  @Get()
  list() {
    return this.etelService.list();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.etelService.find(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateEtel) {
    return this.etelService.update({ id, data: body });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.etelService.delete(id);
  }
}
