import { Test, TestingModule } from '@nestjs/testing';
import { ViacepController } from '../viacep.controller';
import { ViacepService } from '../services/viacep.service';

describe('ViacepController', () => {
  let controller: ViacepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViacepController],
      providers: [ViacepService],
    }).compile();

    controller = module.get<ViacepController>(ViacepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
