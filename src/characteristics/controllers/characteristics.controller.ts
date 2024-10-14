import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CharacteristicsService } from '../services/characteristics.service';
import { CreateCharacteristicDto } from '../dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../dto/update-characteristic.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CharacteristicResponseDto } from '../dto/characteristic-response.dto';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';

@ApiTags('Characteristics')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @ApiOperation({ summary: 'Criar Característica' })
  @ApiCreatedResponse({
    description: 'Característica criada com sucesso',
    type: CharacteristicResponseDto,
  })
  @ApiBody({ type: CreateCharacteristicDto })
  @Post()
  public create(
    @Body() dto: CreateCharacteristicDto,
  ): Promise<CharacteristicResponseDto> {
    return this.characteristicsService.create(dto);
  }

  @ApiOperation({ summary: 'Obter listagem de características' })
  @ApiOkResponse({
    description: 'Listagem de características retornadas com sucesso',
    type: [CharacteristicResponseDto],
  })
  @Get()
  public findAll(): Promise<CharacteristicResponseDto[]> {
    return this.characteristicsService.findAll();
  }

  @ApiOperation({ summary: 'Obter característica por ID' })
  @ApiOkResponse({
    description: 'Característica retornada com sucesso',
    type: CharacteristicResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Característica não encontrada.',
  })
  @Get(':id')
  public findOne(
    @Param() params: IDPostgresQueryDTO,
  ): Promise<CharacteristicResponseDto> {
    return this.characteristicsService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar característica.' })
  @ApiOkResponse({
    description: 'Edição de característica realizada com sucesso',
    type: CharacteristicResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Característica não encontrada.',
  })
  @ApiBody({ type: UpdateCharacteristicDto })
  @Patch(':id')
  public update(
    @Param() params: IDPostgresQueryDTO,
    @Body() dto: UpdateCharacteristicDto,
  ): Promise<CharacteristicResponseDto> {
    return this.characteristicsService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Deletar uma característica.' })
  @ApiNoContentResponse({
    description: 'Característica deletada com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Característica não encontrada.',
  })
  @HttpCode(204)
  @Delete(':id')
  public remove(@Param() params: IDPostgresQueryDTO): Promise<void> {
    return this.characteristicsService.remove(params.id);
  }
}
