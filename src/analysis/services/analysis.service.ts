import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { Analysis } from '../../database/entities/analysis.entity';
import { Repository } from 'typeorm';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DemoRating } from '../types/findTopManifestations.types';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Demonstrations)
    private demonstrationsRepository: Repository<Demonstrations>,
  ) {}

  public async createAnalysis(dto: CreateAnalysisDto): Promise<any> {
    const analysis = this.analysisRepository.create(dto);
    await this.analysisRepository.save(analysis);

    const result = await this.demoRating(dto.characteristicIds);

    return {
      analysis,
      top3Manifestations: result,
    };
  }

  private async demoRating(characteristicIds: string[]): Promise<DemoRating> {
    const data = await this.demonstrationsRepository
      .createQueryBuilder('d')
      .select(['d.id', 'd.name'])
      .innerJoin('d.characteristics', 'c')
      .where('c.id IN (:...characteristicIds)', { characteristicIds })
      .groupBy('d.id, d.name')
      .orderBy('COUNT(c.id)', 'DESC')
      .limit(3)
      .getRawMany();

    return {
      first: data[0]
        ? { demonstrationsId: data[0].d_id, name: data[0].d_name }
        : null,
      second: data[1]
        ? { demonstrationsId: data[1].d_id, name: data[1].d_name }
        : null,
      third: data[2]
        ? { demonstrationsId: data[2].d_id, name: data[2].d_name }
        : null,
    };
  }
}
