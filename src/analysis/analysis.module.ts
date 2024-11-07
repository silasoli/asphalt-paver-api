import { Module } from '@nestjs/common';
import { AnalysisController } from './controllers/analysis.controller';
import { AnalysisService } from './services/analysis.service';
import { Analysis } from '../database/entities/analysis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demonstrations } from '../database/entities/demonstrations.entity';
import { CharacteristicsModule } from '../characteristics/characteristics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis, Demonstrations]),
    CharacteristicsModule,
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
