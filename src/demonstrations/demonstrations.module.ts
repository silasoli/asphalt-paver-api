import { Module } from '@nestjs/common';
import { DemonstrationsService } from './services/demonstrations.service';
import { DemonstrationsController } from './controllers/demonstrations.controller';
import { Demonstrations } from '../database/entities/demonstrations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Demonstrations])],
  controllers: [DemonstrationsController],
  providers: [DemonstrationsService],
})
export class DemonstrationsModule {}
