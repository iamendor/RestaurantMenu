import { Module } from '@nestjs/common';
import { EtelModule } from './etel/etel.module';
import { MenuModule } from './menu/menu.module';
import { AllergenModule } from './allergen/allergen.module';

@Module({
  imports: [EtelModule, MenuModule, AllergenModule],
})
export class ResourcesModule {}
