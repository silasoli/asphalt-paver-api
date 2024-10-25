import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../../database/entities/analysis.entity';
import { DemoRatingDto, DemoRatingObjDto } from './create-analysis-response.dto';

export class AnalysisDetailsResponseDto {
  constructor(entity: Analysis) {
    const { id, demostration, demoRating, postalCode, address, createdAt } =
      entity;

    return { id, demostration, demoRating, postalCode, address, createdAt };
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  demostration?: DemoRatingObjDto;

  @ApiProperty({ type: DemoRatingDto })
  demoRating: DemoRatingDto;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;
}
