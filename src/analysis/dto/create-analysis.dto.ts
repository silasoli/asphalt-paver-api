import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class CreateAnalysisDto {
  @IsOptional()
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: '01001-000' })
  @IsPostalCode('BR')
  postalCode: string;

  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: true })
  @IsString()
  addressNumber: string;

  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  state: string;

  @ApiProperty({ required: true })
  @IsString()
  complement?: string;

  @ApiProperty({
    description: 'IDs das características enviadas pelo usuário',
    example: ['id1', 'id2', 'id3'],
  })
  @IsArray()
  @IsUUID('all', { each: true }) // Valida que cada item no array é um UUID
  characteristicIds: string[];
}
