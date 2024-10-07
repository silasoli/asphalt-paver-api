import { Test, TestingModule } from '@nestjs/testing';
import { DemonstrationsController } from '../demonstrations.controller';
import { DemonstrationsService } from '../services/demonstrations.service';

describe('DemonstrationsController', () => {
  let controller: DemonstrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemonstrationsController],
      providers: [DemonstrationsService],
    }).compile();

    controller = module.get<DemonstrationsController>(DemonstrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
