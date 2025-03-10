import { Module } from '@nestjs/common';
import { CharacteristicsService } from './services/characteristics.service';
import { CharacteristicsController } from './controllers/characteristics.controller';
import { Characteristics } from '../database/entities/characteristics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demonstrations } from '../database/entities/demonstrations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Characteristics, Demonstrations])],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}
