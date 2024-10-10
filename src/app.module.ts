import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SolutionsModule } from './solutions/solutions.module';
import { DemonstrationsModule } from './demonstrations/demonstrations.module';
import { CausesModule } from './causes/causes.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [
    SolutionsModule,
    DemonstrationsModule,
    CausesModule,
    CharacteristicsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
