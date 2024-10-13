import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCauseDto } from '../dto/create-cause.dto';
import { Causes } from '../../database/entities/causes.entity';

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Causes)
    private causesRepository: Repository<Causes>,
  ) {}

  async create(CreateCauseDto: CreateCauseDto): Promise<Causes> {
    const cause = this.causesRepository.create(CreateCauseDto);
    return this.causesRepository.save(cause);
  }

  async findAll(): Promise<Causes[]> {
    return this.causesRepository.find();
  }

  async findOne(id: string): Promise<Causes> {
    return this.causesRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCausesDto: Partial<CreateCauseDto>,
  ): Promise<void> {
    await this.causesRepository.update(id, updateCausesDto);
  }

  async remove(id: string): Promise<void> {
    await this.causesRepository.delete(id);
  }
}
