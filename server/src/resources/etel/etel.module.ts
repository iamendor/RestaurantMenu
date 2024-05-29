import { Module } from '@nestjs/common';
import { EtelService } from './etel.service';
import { EtelController } from './etel.controller';
import { EtelInterceptor } from 'src/interceptor/etel.interceptor';

@Module({
  controllers: [EtelController],
  providers: [EtelInterceptor, EtelService],
})
export class EtelModule {}
