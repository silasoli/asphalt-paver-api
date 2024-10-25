import {
  Controller,
  Post,
  Body,
  HttpCode,
  Delete,
  Param,
  Patch,
  Get,
  Put,
} from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { AnalysisService } from '../services/analysis.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';
import { UpdateAnalysisDto } from '../dto/update-analysis.dto';
import { SetDemostrationDto } from '../dto/set-demostration.dto';
import { ANALYSIS_ERRORS } from '../constants/analysis.errors';
import { AnalysisResponseDto } from '../dto/response/analysis-response.dto';
import { CreateAnalysisResponseDto } from '../dto/response/create-analysis-response.dto';
import { AnalysisDetailsResponseDto } from '../dto/response/analysis-details-response.dto';

@ApiTags('Analysis')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @ApiOperation({ summary: 'Criar uma nova análise' })
  @ApiCreatedResponse({
    description:
      'Análise criada e resultado das manifestações retornado com sucesso',
    type: CreateAnalysisResponseDto,
  })
  @ApiBody({ type: CreateAnalysisDto })
  @Post()
  public async create(
    @Body() dto: CreateAnalysisDto,
  ): Promise<CreateAnalysisResponseDto> {
    return this.analysisService.createAnalysis(dto);
  }

  @ApiOperation({ summary: 'Obter listagem de características' })
  @ApiOkResponse({
    description: 'Listagem de características retornadas com sucesso',
    type: [AnalysisResponseDto],
  })
  @Get()
  public findAll(): Promise<AnalysisResponseDto[]> {
    return this.analysisService.findAll();
  }

  @ApiOperation({ summary: 'Obter característica por ID' })
  @ApiOkResponse({
    description: 'Característica retornada com sucesso',
    type: AnalysisDetailsResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Característica não encontrada.',
  })
  @Get(':id')
  public findOne(
    @Param() params: IDPostgresQueryDTO,
  ): Promise<AnalysisDetailsResponseDto> {
    return this.analysisService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar característica.' })
  @ApiOkResponse({
    description: 'Edição de característica realizada com sucesso',
    type: AnalysisResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Característica não encontrada.',
  })
  @ApiBody({ type: UpdateAnalysisDto })
  @Patch(':id')
  public update(
    @Param() params: IDPostgresQueryDTO,
    @Body() dto: UpdateAnalysisDto,
  ): Promise<AnalysisResponseDto> {
    return this.analysisService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Setar demostração.' })
  @ApiOkResponse({
    description: 'Demostração setada com com sucesso',
    type: AnalysisResponseDto,
  })
  @ApiBadRequestResponse({
    description: ANALYSIS_ERRORS.DEMO_SELECTED.message,
  })
  @ApiBody({ type: SetDemostrationDto })
  @Put(':id')
  public setDemostration(
    @Param() params: IDPostgresQueryDTO,
    @Body() dto: SetDemostrationDto,
  ): Promise<AnalysisResponseDto> {
    return this.analysisService.setDemostration(params.id, dto);
  }

  @ApiOperation({ summary: 'Deletar uma analise.' })
  @ApiNoContentResponse({
    description: 'Analise deletada com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Analise não encontrada.',
  })
  @HttpCode(204)
  @Delete(':id')
  public remove(@Param() params: IDPostgresQueryDTO): Promise<void> {
    return this.analysisService.remove(params.id);
  }
}
