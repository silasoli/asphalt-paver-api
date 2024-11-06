import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from '../../../database/entities/analysis.entity';
import { DemoRatingObjDto } from './create-analysis-response.dto';

export class AnalysisResponseDto {
  constructor(entity: Analysis) {
    const { id, images, demostration, postalCode, address, createdAt } = entity;

    return { id, images, demostration, postalCode, address, createdAt };
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  images: string[];

  @ApiProperty()
  demostration?: DemoRatingObjDto;

  @ApiProperty()
  postalCode: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  createdAt: Date;
}
