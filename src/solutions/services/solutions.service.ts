import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solutions } from '../../database/entities/solutions.entity';
import { CreateSolutionDto } from '../dto/create-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(Solutions)
    private solutionsRepository: Repository<Solutions>,
  ) {}

  async create(createSolutionsDto: CreateSolutionDto): Promise<Solutions> {
    const solution = this.solutionsRepository.create(createSolutionsDto);
    return this.solutionsRepository.save(solution);
  }

  async findAll(): Promise<Solutions[]> {
    return this.solutionsRepository.find();
  }

  async findOne(id: string): Promise<Solutions> {
    return this.solutionsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateSolutionsDto: Partial<CreateSolutionDto>,
  ): Promise<void> {
    await this.solutionsRepository.update(id, updateSolutionsDto);
  }

  async remove(id: string): Promise<void> {
    await this.solutionsRepository.delete(id);
  }
}
