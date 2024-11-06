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
import { DemonstrationsService } from '../services/demonstrations.service';
import { CreateDemonstrationDto } from '../dto/create-demonstration.dto';
import { UpdateDemonstrationDto } from '../dto/update-demonstration.dto';
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
import { DemonstrationResponseDto } from '../dto/demonstration-response.dto';
import { IDPostgresQueryDTO } from '../../common/dto/id-postgres-query.dto';

@ApiBearerAuth()
@ApiTags('Demonstrations')
@Controller('demonstrations')
export class DemonstrationsController {
  constructor(private readonly demonstrationsService: DemonstrationsService) {}

  @ApiOperation({ summary: 'Criar Demonstração' })
  @ApiCreatedResponse({
    description: 'Demonstração criada com sucesso',
    type: DemonstrationResponseDto,
  })
  @ApiBody({ type: CreateDemonstrationDto })
  @Post()
  public create(
    @Body() createDemonstrationDto: CreateDemonstrationDto,
  ): Promise<DemonstrationResponseDto> {
    return this.demonstrationsService.create(createDemonstrationDto);
  }

  @ApiOperation({ summary: 'Obter listagem de demonstrações' })
  @ApiOkResponse({
    description: 'Listagem de demonstrações retornada com sucesso',
    type: [DemonstrationResponseDto],
  })
  @Get()
  public findAll(): Promise<DemonstrationResponseDto[]> {
    return this.demonstrationsService.findAll();
  }

  @ApiOperation({ summary: 'Obter demonstração por ID' })
  @ApiOkResponse({
    description: 'Demonstração retornada com sucesso',
    type: DemonstrationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Demonstração não encontrada.',
  })
  @Get(':id')
  public findOne(
    @Param() params: IDPostgresQueryDTO,
  ): Promise<DemonstrationResponseDto> {
    return this.demonstrationsService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Editar demonstração.' })
  @ApiOkResponse({
    description: 'Edição de demonstração realizada com sucesso',
    type: DemonstrationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Demonstração não encontrada.',
  })
  @ApiBody({ type: UpdateDemonstrationDto })
  @Patch(':id')
  public update(
    @Param() params: IDPostgresQueryDTO,
    @Body() updateDemonstrationDto: UpdateDemonstrationDto,
  ): Promise<DemonstrationResponseDto> {
    return this.demonstrationsService.update(params.id, updateDemonstrationDto);
  }

  // @ApiOperation({ summary: 'Deletar uma demonstração.' })
  // @ApiNoContentResponse({
  //   description: 'Demonstração deletada com sucesso',
  // })
  // @ApiNotFoundResponse({
  //   description: 'Demonstração não encontrada.',
  // })
  // @HttpCode(204)
  // @Delete(':id')
  // public remove(@Param() params: IDPostgresQueryDTO): Promise<void> {
  //   return this.demonstrationsService.remove(params.id);
  // }
}
