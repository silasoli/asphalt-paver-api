import { Injectable } from '@nestjs/common';
import { CreateDemonstrationDto } from '../dto/create-demonstration.dto';
import { UpdateDemonstrationDto } from '../dto/update-demonstration.dto';

@Injectable()
export class DemonstrationsService {
  create(createDemonstrationDto: CreateDemonstrationDto) {
    return 'This action adds a new demonstration';
  }

  findAll() {
    return `This action returns all demonstrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demonstration`;
  }

  update(id: number, updateDemonstrationDto: UpdateDemonstrationDto) {
    return `This action updates a #${id} demonstration`;
  }

  remove(id: number) {
    return `This action removes a #${id} demonstration`;
  }
}
