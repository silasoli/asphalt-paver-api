import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SolutionsModule } from './solutions/solutions.module';
import { DemonstrationsModule } from './demonstrations/demonstrations.module';
import { CausesModule } from './causes/causes.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { TypeOrmConfigModule } from './database/typeorm.module';
import { AnalysisModule } from './analysis/analysis.module';
import { ConfigModule } from '@nestjs/config';
import { ViacepModule } from './viacep/viacep.module';
import { CloudFlareModule } from './cloud-flare/cloud-flare.module';

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
    ViacepModule,
    CloudFlareModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
