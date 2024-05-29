import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { EtelService } from './etel.service';
import { CreateEtel, UpdateEtel } from 'src/dto/etel.dto';
import { EtelInterceptor } from 'src/interceptor/etel.interceptor';

@Controller('etel')
export class EtelController {
  constructor(private readonly etelService: EtelService) {}

  @UseInterceptors(EtelInterceptor)
  @Post()
  create(@Body() body: CreateEtel) {
    return this.etelService.create(body);
  }

  @UseInterceptors(EtelInterceptor)
  @Get()
  list(@Query('q') q: string = '') {
    return this.etelService.list(q);
  }

  @UseInterceptors(EtelInterceptor)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.etelService.find(id);
  }

  @UseInterceptors(EtelInterceptor)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateEtel) {
    return this.etelService.update({ id, data: body });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.etelService.delete(id);
  }
}
