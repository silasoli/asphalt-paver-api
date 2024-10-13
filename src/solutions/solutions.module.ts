import { Module } from '@nestjs/common';
import { SolutionsController } from './controllers/solutions.controller';
import { SolutionsService } from './services/solutions.service';
import { Solutions } from '../database/entities/solutions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Solutions])],
  controllers: [SolutionsController],
  providers: [SolutionsService],
})
export class SolutionsModule {}
