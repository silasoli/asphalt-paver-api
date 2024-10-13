import { ApiProperty } from '@nestjs/swagger';
import { Characteristics } from '../../database/entities/characteristics.entity';

export class CharacteristicResponseDto {
  constructor(entity: Characteristics) {
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
