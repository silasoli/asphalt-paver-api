import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharacteristicsService } from '../services/characteristics.service';
import { UpdateCharacteristicDto } from '../dto/update-characteristic.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';

@ApiTags('Characteristics')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Post()

  create(@Body() dto: CreateCharacteristicDto) {
    return this.characteristicsService.create(dto);
  }

  @Get()
  findAll() {
    return this.characteristicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characteristicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacteristicDto: UpdateCharacteristicDto,
  ) {
    return this.characteristicsService.update(id, updateCharacteristicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsService.remove(id);
  }
}
