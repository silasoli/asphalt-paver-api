import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class CreateAnalysisDto {
  @ApiProperty({
    description: 'IDs das características enviadas pelo usuário',
    example: ['id1', 'id2', 'id3'],
  })
  @IsArray()
  @IsUUID('all', { each: true }) // Valida que cada item no array é um UUID
  characteristicIds: string[];
}
