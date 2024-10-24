import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../database/entities/analysis.entity';

export class AnalysisResponseDto {
  constructor(entity: Analysis) {
    const { id, demostration, postalCode, address, createdAt } = entity;

    return { id, demostration, postalCode, address, createdAt };
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  demostration?: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;
}
