import { Module } from '@nestjs/common';
import { CharacteristicsService } from './services/characteristics.service';
import { CharacteristicsController } from './controllers/characteristics.controller';
import { Characteristics } from '../database/entities/characteristics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristics])],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
})
export class CharacteristicsModule {}
