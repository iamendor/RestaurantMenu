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
import { MenuService } from './menu.service';
import { CreateMenuPipe, DatePipe } from 'src/pipes/menu.pipe';
import { CreateMenu, UpdateMenu } from 'src/dto/menu.dto';
import { UtilService } from 'src/util/util.service';
import { MenuInterceptor } from 'src/interceptor/menu.interceptor';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly util: UtilService,
  ) {}

  @UseInterceptors(MenuInterceptor)
  @Post()
  create(@Body(CreateMenuPipe) data: CreateMenu) {
    return this.menuService.create(data);
  }

  @UseInterceptors(MenuInterceptor)
  @Get()
  async list(@Query('date', DatePipe) date?: Date) {
    if (date) {
      const menus = await this.menuService.findByDate(date);
      return menus;
    }
    const menus = await this.menuService.list();
    return this.util.groupBy(menus, 'date', (key: Date) =>
      key.getTime().toString(),
    );
  }

  @UseInterceptors(MenuInterceptor)
  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.find(id);
  }

  @UseInterceptors(MenuInterceptor)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMenu) {
    return this.menuService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.delete(id);
  }
}
