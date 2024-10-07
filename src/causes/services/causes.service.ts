import { Injectable } from '@nestjs/common';
import { UpdateCauseDto } from '../dto/update-cause.dto';
import { CreateCauseDto } from '../dto/create-cause.dto';

@Injectable()
export class CausesService {
  create(dto: CreateCauseDto) {
    return dto;
  }

  findAll() {
    return `This action returns all causes`;
  }

  findOne(id: string) {
    return id;
  }

  update(id: string, dto: UpdateCauseDto) {
    return id + '' + dto;
  }

  remove(id: string) {
    return id;
  }
}
