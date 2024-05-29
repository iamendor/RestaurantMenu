import { Test, TestingModule } from '@nestjs/testing';
import { EtelController } from './etel.controller';
import { EtelService } from './etel.service';

describe('EtelController', () => {
  let controller: EtelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtelController],
      providers: [EtelService],
    }).compile();

    controller = module.get<EtelController>(EtelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
