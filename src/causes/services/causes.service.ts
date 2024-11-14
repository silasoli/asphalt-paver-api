import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCauseDto } from '../dto/create-cause.dto';
import { UpdateCauseDto } from '../dto/update-cause.dto';
import { Causes } from '../../database/entities/causes.entity';
import { CauseResponseDto } from '../dto/cause-response.dto';
import { FilterCausesDto } from '../dto/causes-filter.dto';
import { DemonstrationsService } from '../../demonstrations/services/demonstrations.service';

//valid: validar not found no create, no update e validar repetição de nome.

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Causes)
    private causesRepository: Repository<Causes>,
    private demonstrationsService: DemonstrationsService,
  ) {}

  public async create(dto: CreateCauseDto): Promise<CauseResponseDto> {
    const demonstration = await this.demonstrationsService.findOne(
      dto.demonstrationId,
    );

    const cause = this.causesRepository.create({
      ...dto,
      demonstration,
    });

    const savedCause = await this.causesRepository.save(cause);

    return new CauseResponseDto(savedCause);
  }

  public async findAll(dto: FilterCausesDto): Promise<CauseResponseDto[]> {
    const where: FindOptionsWhere<Causes> = {};

    if (dto.demonstrationId) {
      where.demonstration = { id: dto.demonstrationId };
    }

    const causes = await this.causesRepository.find({
      where
    });

    return causes.map((cause) => new CauseResponseDto(cause));
  }

  public async findOne(id: string): Promise<CauseResponseDto> {
    const cause = await this.causesRepository.findOneBy({ id });
  
    return new CauseResponseDto(cause);
  }

  public async update(
    id: string,
    dto: UpdateCauseDto,
  ): Promise<CauseResponseDto> {
    await this.causesRepository.update(id, dto);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.causesRepository.delete(id);
  }
}
