import { Module } from '@nestjs/common';
import { DemonstrationsService } from './services/demonstrations.service';
import { DemonstrationsController } from './controllers/demonstrations.controller';

@Module({
  controllers: [DemonstrationsController],
  providers: [DemonstrationsService],
})
export class DemonstrationsModule {}
