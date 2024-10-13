import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCauseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  demonstrations_id: string;
}
