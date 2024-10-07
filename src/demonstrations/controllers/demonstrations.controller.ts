import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemonstrationsService } from '../services/demonstrations.service';
import { CreateDemonstrationDto } from '../dto/create-demonstration.dto';
import { UpdateDemonstrationDto } from '../dto/update-demonstration.dto';

@Controller('demonstrations')
export class DemonstrationsController {
  constructor(private readonly demonstrationsService: DemonstrationsService) {}

  @Post()
  create(@Body() createDemonstrationDto: CreateDemonstrationDto) {
    return this.demonstrationsService.create(createDemonstrationDto);
  }

  @Get()
  findAll() {
    return this.demonstrationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demonstrationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemonstrationDto: UpdateDemonstrationDto) {
    return this.demonstrationsService.update(+id, updateDemonstrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demonstrationsService.remove(+id);
  }
}
