import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class SetDemostrationDto {
  @ApiProperty({
    description: 'IDs das características enviadas pelo usuário',
  })
  @IsUUID('all')
  demostration: string;
}
