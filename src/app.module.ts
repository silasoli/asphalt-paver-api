import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SolutionsModule } from './solutions/solutions.module';
import { DemonstrationsModule } from './demonstrations/demonstrations.module';
import { CausesModule } from './causes/causes.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { TypeOrmConfigModule } from './database/typeorm.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmConfigModule,
    SolutionsModule,
    DemonstrationsModule,
    CausesModule,
    CharacteristicsModule,
    AnalysisModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
