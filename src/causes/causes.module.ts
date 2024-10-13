import { Module } from '@nestjs/common';
import { CausesController } from './controllers/causes.controller';
import { CausesService } from './services/causes.service';
import { Causes } from '../database/entities/causes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Causes])],
  controllers: [CausesController],
  providers: [CausesService],
})
export class CausesModule {}
