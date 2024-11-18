import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Solutions } from '../../database/entities/solutions.entity';
import { CreateSolutionDto } from '../dto/create-solution.dto';
import { UpdateSolutionDto } from '../dto/update-solution.dto';
import { SolutionResponseDto } from '../dto/solution-response.dto';
import { DemonstrationsService } from '../../demonstrations/services/demonstrations.service';
import { FilterSolutionsDto } from '../dto/solutions-filter.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solutions)
    private solutionsRepository: Repository<Solutions>,
    private demonstrationsService: DemonstrationsService,
  ) {}

  public async create(dto: CreateSolutionDto): Promise<SolutionResponseDto> {
    const demonstration = await this.demonstrationsService.findOne(
      dto.demonstrationId,
    );

    const solution = this.solutionsRepository.create({
      ...dto,
      demonstration,
    });

    const created = await this.solutionsRepository.save(solution);

    return new SolutionResponseDto(created);
  }

  public async findAll(
    dto: FilterSolutionsDto,
  ): Promise<SolutionResponseDto[]> {
    const where: FindOptionsWhere<Solutions> = {};

    if (dto.demonstrationId) {
      where.demonstration = { id: dto.demonstrationId };
    }

    const solutions = await this.solutionsRepository.find({
      where,
    });

    return solutions.map((solution) => new SolutionResponseDto(solution));
  }

  public async findOne(id: string): Promise<SolutionResponseDto> {
    const solution = await this.solutionsRepository.findOneBy({ id });

    return new SolutionResponseDto(solution);
  }

  public async update(
    id: string,
    dto: UpdateSolutionDto,
  ): Promise<SolutionResponseDto> {
    await this.solutionsRepository.update(id, dto);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.solutionsRepository.delete(id);
  }
}
