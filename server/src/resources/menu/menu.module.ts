import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuInterceptor } from 'src/interceptor/menu.interceptor';

@Module({
  controllers: [MenuController],
  providers: [MenuInterceptor, MenuService],
})
export class MenuModule {}
