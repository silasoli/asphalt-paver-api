import { Module } from '@nestjs/common';
import { CausesController } from './controllers/causes.controller';
import { CausesService } from './services/causes.service';

@Module({
  controllers: [CausesController],
  providers: [CausesService],
})
export class CausesModule {}
