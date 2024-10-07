import { Module } from '@nestjs/common';
import { CharacteristicsService } from './services/characteristics.service';
import { CharacteristicsController } from './controllers/characteristics.controller';

@Module({
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
})
export class CharacteristicsModule {}
