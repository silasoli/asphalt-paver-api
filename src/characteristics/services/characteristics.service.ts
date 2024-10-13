import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Characteristics } from '../../database/entities/characteristics.entity';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../dto/update-characteristic.dto';
import { CharacteristicResponseDto } from '../dto/characteristic-response.dto';

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectRepository(Characteristics)
    private characteristicsRepository: Repository<Characteristics>,
  ) {}

  public async create(
    dto: CreateCharacteristicDto,
  ): Promise<CharacteristicResponseDto> {
    const characteristic = this.characteristicsRepository.create(dto);

    const created = await this.characteristicsRepository.save(characteristic);

    return new CharacteristicResponseDto(created); 
  }

  public async findAll(): Promise<CharacteristicResponseDto[]> {
    const characteristics = await this.characteristicsRepository.find();

    return characteristics.map((item) => new CharacteristicResponseDto(item));
  }

  public async findOne(id: string): Promise<CharacteristicResponseDto> {
    const item = await this.characteristicsRepository.findOneBy({
      id,
    });

    return new CharacteristicResponseDto(item);
  }

  public async update(
    id: string,
    dto: UpdateCharacteristicDto,
  ): Promise<CharacteristicResponseDto> {
    await this.characteristicsRepository.update(id, dto);

    return this.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.characteristicsRepository.delete(id);
  }
}
