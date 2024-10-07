import { Module } from '@nestjs/common';
import { SolutionsController } from './controllers/solutions.controller';
import { SolutionsService } from './services/solutions.service';

@Module({
  controllers: [SolutionsController],
  providers: [SolutionsService],
})
export class SolutionsModule {}
