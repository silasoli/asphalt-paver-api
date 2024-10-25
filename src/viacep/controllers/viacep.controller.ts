import { Controller, Get, Param } from '@nestjs/common';
import { ViacepService } from '../services/viacep.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostalCodeQueryDTO } from '../dto/postal-code-query.dto';
import { FindByPostalCodeResponseDto } from '../dto/postal-code-respnse.dto';

@ApiTags('Via Cep')
@Controller('viacep')
export class ViacepController {
  constructor(private readonly viacepService: ViacepService) {}

  @ApiOperation({ summary: 'Obter dados pelo CEP' })
  @ApiOkResponse({
    description: 'Dados retornados com sucesso',
    type: FindByPostalCodeResponseDto,
  })
  @Get(':postalCode')
  findOne(
    @Param() params: PostalCodeQueryDTO,
  ): Promise<FindByPostalCodeResponseDto> {
    return this.viacepService.findByPostalCode(params.postalCode);
  }
}
