import { Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { Analysis } from '../../database/entities/analysis.entity';
import { Repository } from 'typeorm';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DemoRating } from '../types/findTopManifestations.types';
import { AnalysisResponseDto } from '../dto/analysis-response.dto';
import { UpdateAnalysisDto } from '../dto/update-analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Demonstrations)
    private demonstrationsRepository: Repository<Demonstrations>,
  ) {}

  private async demoRating(characteristicIds: string[]): Promise<DemoRating> {
    //s salvar retorno
    const data = await this.demonstrationsRepository
      .createQueryBuilder('d')
      .select(['d.id', 'd.name'])
      .innerJoin(
        'characteristics_demonstrations_demonstrations',
        'dc',
        'dc."demonstrationsId" = d.id',
      ) 
      .innerJoin('characteristics', 'c', 'c.id = dc."characteristicsId"')
      .where('c.id IN (:...characteristicIds)', { characteristicIds })
      .groupBy('d.id, d.name')
      .orderBy('COUNT(c.id)', 'DESC')
      .limit(3)
      .getRawMany();

    return {
      first: data[0]
        ? {
            demonstrationsId: data[0].d_id,
            name: data[0].d_name,
          }
        : null,
      second: data[1]
        ? {
            demonstrationsId: data[1].d_id,
            name: data[1].d_name,
          }
        : null,
      third: data[2]
        ? {
            demonstrationsId: data[2].d_id,
            name: data[2].d_name,
          }
        : null,
    };
  }

  public async createAnalysis(dto: CreateAnalysisDto): Promise<any> {
    const analysis = this.analysisRepository.create(dto);
    await this.analysisRepository.save(analysis);

    const result = await this.demoRating(dto.characteristicIds);

    return {
      analysis,
      top3Manifestations: result,
    };
  }

  public async findAll(): Promise<AnalysisResponseDto[]> {
    const characteristics = await this.analysisRepository.find();

    return characteristics.map((item) => new AnalysisResponseDto(item));
  }

  public async findOne(id: string): Promise<AnalysisResponseDto> {
    const item = await this.analysisRepository.findOneByOrFail({
      id,
    });

    return new AnalysisResponseDto(item);
  }

  public async update(
    id: string,
    dto: UpdateAnalysisDto,
  ): Promise<AnalysisResponseDto> {
    await this.analysisRepository.update(id, dto);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.analysisRepository.delete(id);
  }
}
