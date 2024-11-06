import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../../database/entities/analysis.entity';
import { DemoRating } from '../../types/findTopManifestations.types';

export class DemoRatingObjDto {
  @ApiProperty()
  demonstrationsId: string;

  @ApiProperty()
  name: string;
}

export class DemoRatingDto {
  @ApiProperty()
  first: DemoRatingObjDto | null;
  @ApiProperty()
  second: DemoRatingObjDto | null;
  @ApiProperty()
  third: DemoRatingObjDto | null;
}

export class CreateAnalysisResponseDto {
  constructor(analysis: Analysis, result: DemoRating) {
    Object.assign(this, { ...analysis, result });
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  images: string[];

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

  @ApiProperty({ type: DemoRatingDto })
  demoRating: DemoRatingDto;

  //   @Column('simple-array')
  @ApiProperty()
  characteristicIds: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
