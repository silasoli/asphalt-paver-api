import { ApiProperty } from '@nestjs/swagger';
import { Solutions } from '../../database/entities/solutions.entity';

export class SolutionResponseDto {
  constructor(entity: Solutions) {
    const { id, name, description, createdAt, updatedAt } = entity;
    return { id, name, description, createdAt, updatedAt };
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
