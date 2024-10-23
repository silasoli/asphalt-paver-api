import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../database/entities/analysis.entity';

export class AnalysisResponseDto {
  constructor(entity: Analysis) {
    Object.assign(this, entity);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  addressNumber: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  demostration?: string;

  //   @Column('simple-array')
  @ApiProperty()
  characteristicIds: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
