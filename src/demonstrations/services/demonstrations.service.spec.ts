import { Test, TestingModule } from '@nestjs/testing';
import { DemonstrationsService } from './services/demonstrations.service';

describe('DemonstrationsService', () => {
  let service: DemonstrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemonstrationsService],
    }).compile();

    service = module.get<DemonstrationsService>(DemonstrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
