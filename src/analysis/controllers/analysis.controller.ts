import { Controller, Post, Body } from '@nestjs/common';
import { CreateAnalysisDto } from '../dto/create-analysis.dto';
import { AnalysisService } from '../services/analysis.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Analysis')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @ApiOperation({ summary: 'Criar uma nova análise' })
  @ApiCreatedResponse({
    description:
      'Análise criada e resultado das manifestações retornado com sucesso',
  })
  @Post()
  public async create(@Body() dto: CreateAnalysisDto) {
    return this.analysisService.createAnalysis(dto);
  }
}
