import { Injectable } from '@nestjs/common';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemonstrationDto } from '../dto/create-demonstration.dto';

@Injectable()
export class DemonstrationsService {
  constructor(
    @InjectRepository(Demonstrations)
    private manifestationsRepository: Repository<Demonstrations>,
  ) {}

  async create(dto: CreateDemonstrationDto): Promise<Demonstrations> {
    const manifestation = this.manifestationsRepository.create(dto);
    return this.manifestationsRepository.save(manifestation);
  }

  async findAll(): Promise<Demonstrations[]> {
    return this.manifestationsRepository.find();
  }

  async findOne(id: string): Promise<Demonstrations> {
    return this.manifestationsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    dto: Partial<CreateDemonstrationDto>,
  ): Promise<void> {
    await this.manifestationsRepository.update(id, dto);
  }

  async remove(id: string): Promise<void> {
    await this.manifestationsRepository.delete(id);
  }
}
