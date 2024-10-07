import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateSolutionDto } from '../dto/create-solution.dto';
import { UpdateSolutionDto } from '../dto/update-solution.dto';
import { SolutionsService } from '../services/solutions.service';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  create(@Body() dto: CreateSolutionDto) {
    return this.solutionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.solutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solutionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSolutionDto) {
    return this.solutionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solutionsService.remove(id);
  }
}
