import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCauseDto } from '../dto/create-cause.dto';
import { UpdateCauseDto } from '../dto/update-cause.dto';
import { Causes } from '../../database/entities/causes.entity';
import { CauseResponseDto } from '../dto/cause-response.dto';

//valid: validar not found no create, no update e validar repetição de nome.

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Causes)
    private causesRepository: Repository<Causes>,
  ) {}

  public async create(dto: CreateCauseDto): Promise<CauseResponseDto> {
    const cause = this.causesRepository.create(dto);

    const savedCause = await this.causesRepository.save(cause);

    return new CauseResponseDto(savedCause);
  }

  public async findAll(): Promise<CauseResponseDto[]> {
    const causes = await this.causesRepository.find();

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
