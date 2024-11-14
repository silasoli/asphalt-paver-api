import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FilterCausesDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID(null, { message: 'ID must be an UUID.' })
  demonstrationId?: string;
}
