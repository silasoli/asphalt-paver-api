import { Injectable } from '@nestjs/common';
import { Demonstrations } from '../../database/entities/demonstrations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDemonstrationDto } from '../dto/create-demonstration.dto';
import { UpdateDemonstrationDto } from '../dto/update-demonstration.dto';
import { DemonstrationResponseDto } from '../dto/demonstration-response.dto';

@Injectable()
export class DemonstrationsService {
  constructor(
    @InjectRepository(Demonstrations)
    private demonstrationsRepository: Repository<Demonstrations>,
  ) {}

  public async create(
    dto: CreateDemonstrationDto,
  ): Promise<DemonstrationResponseDto> {
    const demonstration = this.demonstrationsRepository.create(dto);

    const created = await this.demonstrationsRepository.save(demonstration);

    return new DemonstrationResponseDto(created);
  }

  public async findAll(): Promise<DemonstrationResponseDto[]> {
    const demonstrations = await this.demonstrationsRepository.find();

    return demonstrations.map((item) => new DemonstrationResponseDto(item));
  }

  public async findOne(id: string): Promise<DemonstrationResponseDto> {
    const demonstration = await this.demonstrationsRepository.findOneBy({ id });

    return new DemonstrationResponseDto(demonstration);
  }

  public async update(
    id: string,
    dto: UpdateDemonstrationDto,
  ): Promise<DemonstrationResponseDto> {
    await this.demonstrationsRepository.update(id, dto);

    return this.findOne(id);
  }

  // public async remove(id: string): Promise<void> {
  //   await this.demonstrationsRepository.delete(id);
  // }
}
