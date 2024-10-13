import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristics } from '../../database/entities/characteristics.entity';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectRepository(Characteristics)
    private characteristicsRepository: Repository<Characteristics>,
  ) {}

  async create(
    createCharacteristicsDto: CreateCharacteristicDto,
  ): Promise<Characteristics> {
    const characteristic = this.characteristicsRepository.create(
      createCharacteristicsDto,
    );
    return this.characteristicsRepository.save(characteristic);
  }

  async findAll(): Promise<Characteristics[]> {
    return this.characteristicsRepository.find();
  }

  async findOne(id: string): Promise<Characteristics> {
    return this.characteristicsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCharacteristicsDto: Partial<CreateCharacteristicDto>,
  ): Promise<void> {
    await this.characteristicsRepository.update(id, updateCharacteristicsDto);
  }

  async remove(id: string): Promise<void> {
    await this.characteristicsRepository.delete(id);
  }
}
