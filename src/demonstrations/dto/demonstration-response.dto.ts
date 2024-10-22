import { ApiProperty } from '@nestjs/swagger';
import { Demonstrations } from '../../database/entities/demonstrations.entity';

export class DemonstrationResponseDto {
  constructor(entity: Demonstrations) {
    const { id, name, createdAt, updatedAt } = entity;
    return { id, name, createdAt, updatedAt };
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
