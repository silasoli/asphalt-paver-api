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

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;
}
