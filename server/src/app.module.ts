import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ResourcesModule } from './resources/resources.module';
import { ConfigModule } from '@nestjs/config';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ResourcesModule,
    UtilModule,
  ],
})
export class AppModule {}
