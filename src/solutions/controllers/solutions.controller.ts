import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateSolutionDto } from '../dto/create-solution.dto';
import { UpdateSolutionDto } from '../dto/update-solution.dto';
import { SolutionsService } from '../services/solutions.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SolutionResponseDto } from '../dto/solution-response.dto';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';
import { FilterSolutionsDto } from '../dto/solutions-filter.dto';

@ApiBearerAuth()
@ApiTags('Solutions')
@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @ApiOperation({ summary: 'Criar Solução' })
  @ApiCreatedResponse({
    description: 'Solução criada com sucesso',
    type: SolutionResponseDto,
  })
  @ApiBody({ type: CreateSolutionDto })
  @Post()
  public create(@Body() dto: CreateSolutionDto): Promise<SolutionResponseDto> {
    return this.solutionsService.create(dto);
  }

  @ApiOperation({ summary: 'Obter listagem de soluções' })
  @ApiOkResponse({
    description: 'Listagem de soluções retornada com sucesso',
    type: [SolutionResponseDto],
  })
  @Get()
  public findAll(
    @Query() dto: FilterSolutionsDto,
  ): Promise<SolutionResponseDto[]> {
    return this.solutionsService.findAll(dto);
  }

  @ApiOperation({ summary: 'Obter solução por ID' })
  @ApiOkResponse({
    description: 'Solução retornada com sucesso',
    type: SolutionResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Solução não encontrada.',
  })
  @Get(':id')
  public findOne(
    @Param() params: IDPostgresQueryDTO,
  ): Promise<SolutionResponseDto> {
    return this.solutionsService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar solução.' })
  @ApiOkResponse({
    description: 'Edição de solução realizada com sucesso',
    type: SolutionResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Solução não encontrada.',
  })
  @ApiBody({ type: UpdateSolutionDto })
  @Patch(':id')
  public update(
    @Param() params: IDPostgresQueryDTO,
    @Body() dto: UpdateSolutionDto,
  ): Promise<SolutionResponseDto> {
    return this.solutionsService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Deletar uma solução.' })
  @ApiNoContentResponse({
    description: 'Solução deletada com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Solução não encontrada.',
  })
  @HttpCode(204)
  @Delete(':id')
  public remove(@Param() params: IDPostgresQueryDTO): Promise<void> {
    return this.solutionsService.remove(params.id);
  }
}
