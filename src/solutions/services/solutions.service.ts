import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solutions } from '../../database/entities/solutions.entity';
import { CreateSolutionDto } from '../dto/create-solution.dto';
import { UpdateSolutionDto } from '../dto/update-solution.dto';
import { SolutionResponseDto } from '../dto/solution-response.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solutions)
    private solutionsRepository: Repository<Solutions>,
  ) {}

  public async create(dto: CreateSolutionDto): Promise<SolutionResponseDto> {
    const solution = this.solutionsRepository.create(dto);
    
    const created = await this.solutionsRepository.save(solution);

    return new SolutionResponseDto(created);
  }

  public async findAll(): Promise<SolutionResponseDto[]> {
    const solutions = await this.solutionsRepository.find();

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
