import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { FindOneResponse } from '../types/find-one-response.types';
import { FindByPostalCodeResponseDto } from '../dto/postal-code-respnse.dto';

@Injectable()
export class ViacepService {
  private VIACEP_URL = `${process.env.VIACEP_URL}`;

  constructor(private readonly httpService: HttpService) {}

  private async findOne(
    postalCode: string,
  ): Promise<AxiosResponse<FindOneResponse>> {
    const URL = `${this.VIACEP_URL}/${postalCode}/json`;

    try {
      const response = await this.httpService.axiosRef.get(URL);

      return response.data as AxiosResponse<FindOneResponse>;
    } catch (error) {
      // console.log(error.response.data)
      const statusCode = error.response.status;
      throw new HttpException({}, statusCode);
    }
  }

  public async findByPostalCode(
    postalCode: string,
  ): Promise<FindByPostalCodeResponseDto> {
    const response = await this.findOne(postalCode);
    return new FindByPostalCodeResponseDto(response);
  }
}
