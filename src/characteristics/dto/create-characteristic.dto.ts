import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCharacteristicDto {
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
