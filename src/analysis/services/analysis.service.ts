import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { Analysis } from '../../database/entities/analysis.entity';
import { Repository } from 'typeorm';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Demonstrations)
    private demonstrationsRepository: Repository<Demonstrations>,
  ) {}

  public async createAnalysis(dto: CreateAnalysisDto): Promise<any> {
    // Salvar análise no banco de dados
    const analysis = this.analysisRepository.create(dto);
    await this.analysisRepository.save(analysis);

    // Executar a query para encontrar as 3 manifestações principais
    const result = await this.findTop3Manifestations(dto.characteristicIds);

    return {
      analysis,
      top3Manifestations: result,
    };
  }

  private async findTop3Manifestations(
    characteristicIds: string[],
  ): Promise<any[]> {
    return this.demonstrationsRepository
      .createQueryBuilder('d')
      .select(['d.id', 'd.name'])
      .innerJoin('d.characteristics', 'c')
      .where('c.id IN (:...characteristicIds)', { characteristicIds })
      .groupBy('d.id, d.name') // Certifique-se de agrupar por d.id e d.name
      .orderBy('COUNT(c.id)', 'DESC')
      .limit(3)
      .getRawMany();
  }
}
