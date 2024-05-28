import { Module } from '@nestjs/common';
import { EtelService } from './etel.service';
import { EtelController } from './etel.controller';

@Module({
  controllers: [EtelController],
  providers: [EtelService],
})
export class EtelModule {}
