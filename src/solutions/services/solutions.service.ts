import { Injectable } from '@nestjs/common';
import { CreateSolutionDto } from '../dto/create-solution.dto';
import { UpdateSolutionDto } from '../dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  create(dto: CreateSolutionDto) {
    return dto;
  }

  findAll() {
    return `This action returns all solutions`;
  }

  findOne(id: string) {
    return id;
  }

  update(id: string, dto: UpdateSolutionDto) {
    return id + `` + dto;
  }

  remove(id: string) {
    return id;
  }
}
