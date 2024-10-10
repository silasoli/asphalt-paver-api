import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CausesService } from '../services/causes.service';
import { CreateCauseDto } from '../dto/create-cause.dto';
import { UpdateCauseDto } from '../dto/update-cause.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Causes')
@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Post()
  create(@Body() dto: CreateCauseDto) {
    return this.causesService.create(dto);
  }

  @Get()
  findAll() {
    return this.causesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCauseDto) {
    return this.causesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.causesService.remove(id);
  }
}
