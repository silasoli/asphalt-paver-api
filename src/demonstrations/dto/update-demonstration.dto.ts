import { PartialType } from '@nestjs/swagger';
import { CreateDemonstrationDto } from './create-demonstration.dto';

export class UpdateDemonstrationDto extends PartialType(
  CreateDemonstrationDto,
) {}
