import { Module } from '@nestjs/common';
import { ViacepService } from './services/viacep.service';
import { ViacepController } from './controllers/viacep.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ViacepController],
  providers: [ViacepService],
})
export class ViacepModule {}
