import { ApiProperty } from '@nestjs/swagger';
import { Characteristics } from '../../database/entities/characteristics.entity';

export class CharacteristicResponseDto {
  constructor(entity: Characteristics) {
    const { id, name, description, demonstrations } = entity;
    return {
      id,
      name,
      description,
      // demonstrations: demonstrations.map((demo) => ({
      //   id: demo.id,
      //   name: demo.name,
      // })),
    };
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  // @ApiProperty({ type: () => [{ id: String, name: String }] })
  // demonstrations: any[];
}
