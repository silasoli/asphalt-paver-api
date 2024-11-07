import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { Analysis } from '../../database/entities/analysis.entity';
import { Repository } from 'typeorm';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DemoRating } from '../types/findTopManifestations.types';
import { UpdateAnalysisDto } from '../dto/update-analysis.dto';
import { SetDemostrationDto } from '../dto/set-demostration.dto';
import { ANALYSIS_ERRORS } from '../constants/analysis.errors';
import { Injectable } from '@nestjs/common';
import { AnalysisResponseDto } from '../dto/response/analysis-response.dto';
import {
  CreateAnalysisResponseDto,
  DemoRatingDto,
  DemoRatingObjDto,
} from '../dto/response/create-analysis-response.dto';
import { AnalysisDetailsResponseDto } from '../dto/response/analysis-details-response.dto';
import { CharacteristicsService } from '../../characteristics/services/characteristics.service';
import { CharacteristicResponseDto } from '../../characteristics/dto/characteristic-response.dto';

@Injectable()
export class AnalysisService {
  constructor(
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    @InjectRepository(Demonstrations)
    private demonstrationsRepository: Repository<Demonstrations>,
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  private async demoRating(characteristicIds: string[]): Promise<DemoRating> {
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

  public async createAnalysis(
    dto: CreateAnalysisDto,
  ): Promise<CreateAnalysisResponseDto> {
    const demoRating = await this.demoRating(dto.characteristicIds);

    const analysis = this.analysisRepository.create({
      ...dto,
      demoRating,
      demostration: demoRating.first,
      //remover isso depois e fazer o usuario escolher a demonstração
    });
    await this.analysisRepository.save(analysis);

    return new CreateAnalysisResponseDto(analysis, demoRating);
  }

  public async findAll(): Promise<AnalysisResponseDto[]> {
    const analysis = await this.analysisRepository.find({
      order: { createdAt: 'DESC' },
    });

    return analysis.map((item) => new AnalysisResponseDto(item));
  }

  public async findOne(id: string): Promise<AnalysisDetailsResponseDto> {
    const item = await this.analysisRepository.findOneByOrFail({
      id,
    });

    return new AnalysisDetailsResponseDto(item);
  }

  public async findCaracteristicByAnalysis(
    id: string,
  ): Promise<CharacteristicResponseDto[]> {
    const item = await this.analysisRepository.findOneByOrFail({
      id,
    });

    return this.characteristicsService.findCaracteristicByIds(
      item.characteristicIds,
    );
  }

  findDemoById(
    demoRatingDto: DemoRatingDto,
    id: string,
  ): DemoRatingObjDto | null {
    const properties = ['first', 'second', 'third'];

    for (const prop of properties) {
      if (demoRatingDto[prop as keyof DemoRatingDto]?.demonstrationsId === id) {
        return demoRatingDto[prop as keyof DemoRatingDto];
      }
    }
    return null;
  }

  public async setDemostration(
    id: string,
    dto: SetDemostrationDto,
  ): Promise<AnalysisResponseDto> {
    const item = await this.findOne(id);
    if (item.demostration) ANALYSIS_ERRORS.DEMO_SELECTED;

    const demostration = this.findDemoById(item.demoRating, dto.demostration);
    if (!demostration) ANALYSIS_ERRORS.DEMO_NOT_SELECTED;

    await this.analysisRepository.update(id, {
      demostration,
    });

    return this.findOne(id);
  }

  public async update(
    id: string,
    dto: UpdateAnalysisDto,
  ): Promise<AnalysisResponseDto> {
    await this.analysisRepository.update(id, dto);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.analysisRepository.delete(id);
  }
}
