import { PartialType } from '@nestjs/mapped-types';
import { CreateDemonstrationDto } from './create-demonstration.dto';

export class UpdateDemonstrationDto extends PartialType(CreateDemonstrationDto) {}
