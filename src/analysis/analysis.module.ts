import { Module } from '@nestjs/common';
import { AnalysisController } from './controllers/analysis.controller';
import { AnalysisService } from './services/analysis.service';
import { Analysis } from '../database/entities/analysis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demonstrations } from '../database/entities/demonstrations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analysis, Demonstrations])],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}
