import { Test, TestingModule } from '@nestjs/testing';
import { EtelService } from './etel.service';

describe('EtelService', () => {
  let service: EtelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtelService],
    }).compile();

    service = module.get<EtelService>(EtelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
