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
import { CausesService } from '../services/causes.service';
import { CreateCauseDto } from '../dto/create-cause.dto';
import { UpdateCauseDto } from '../dto/update-cause.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CauseResponseDto } from '../dto/cause-response.dto';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';

@ApiTags('Causes')
@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @ApiOperation({ summary: 'Criar Causas' })
  @ApiCreatedResponse({
    description: 'Causa com sucesso',
    type: CauseResponseDto,
  })
  @ApiBody({ type: CreateCauseDto })
  @Post()
  public create(@Body() dto: CreateCauseDto): Promise<CauseResponseDto> {
    return this.causesService.create(dto);
  }

  @ApiOperation({ summary: 'Obter listagem causas' })
  @ApiOkResponse({
    description: 'Listagem de causas retornadas com sucesso',
    type: [CauseResponseDto],
  })
  @Get()
  public findAll(): Promise<CauseResponseDto[]> {
    return this.causesService.findAll();
  }

  @ApiOperation({ summary: 'Obter causa por ID' })
  @ApiOkResponse({
    description: 'Causa retornada com sucesso',
    type: CauseResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Causa não encontrada.',
  })
  @Get(':id')
  public findOne(
    @Param() params: IDPostgresQueryDTO,
  ): Promise<CauseResponseDto> {
    return this.causesService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar causa.' })
  @ApiOkResponse({
    description: 'Edição de causa realizada com sucesso',
    type: CauseResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Causa não encontrada.',
  })
  @ApiBody({ type: UpdateCauseDto })
  @Patch(':id')
  public update(
    @Param() params: IDPostgresQueryDTO,
    @Body() dto: UpdateCauseDto,
  ): Promise<CauseResponseDto> {
    return this.causesService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Deletar uma causa.' })
  @ApiNoContentResponse({
    description: 'Causa deletada com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Causa não encontrada.',
  })
  @HttpCode(204)
  @Delete(':id')
  public remove(@Param() params: IDPostgresQueryDTO): Promise<void> {
    return this.causesService.remove(params.id);
  }
}
