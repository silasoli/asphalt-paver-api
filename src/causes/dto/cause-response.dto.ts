import { ApiProperty } from '@nestjs/swagger';
import { Causes } from '../../database/entities/causes.entity';

export class CauseResponseDto {
  constructor(entity: Causes) {
    // Object.assign(this, data);
    const { id, name, description, createdAt, updatedAt } = entity;

    return { id, name, description, createdAt, updatedAt};
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
