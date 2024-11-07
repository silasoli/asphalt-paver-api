import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../../database/entities/analysis.entity';
import {
  DemoRatingDto,
  DemoRatingObjDto,
} from './create-analysis-response.dto';

export class AnalysisDetailsResponseDto {
  constructor(entity: Analysis) {
    const {
      id,
      images,
      demostration,
      demoRating,
      characteristicIds,
      postalCode,
      address,
      addressNumber,
      city,
      complement,
      state,
      createdAt,
    } = entity;

    return {
      id,
      images,
      demostration,
      demoRating,
      characteristicIds,
      postalCode,
      address,
      addressNumber,
      city,
      complement,
      state,
      createdAt,
    };
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  images: string[];

  @ApiProperty()
  demostration?: DemoRatingObjDto;

  @ApiProperty({ type: DemoRatingDto })
  demoRating: DemoRatingDto;

  @ApiProperty()
  characteristicIds: string[];

  @ApiProperty()
  postalCode: string;

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
  createdAt: Date;
}
