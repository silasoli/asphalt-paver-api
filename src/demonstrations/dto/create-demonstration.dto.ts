import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateDemonstrationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
