import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  HttpCode,
  Body,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudFlareService } from '../services/cloud-flare.service';
import { UploadImgCloudFlareDto } from '../dto/update-img-cloud-flare.dto';
import { CLOUD_FLARE_ERRORS } from '../constants/cloud-flare.errors';
import { UploadImgCloudFlareResponseDto } from '../dto/update-img-cloud-flare-response.dto';
import { IDQueryDTO } from '../../common/dto/id-query.dto';
import { FileInterceptor2 } from '../file.interceptor';

export interface FileInfo {
  fieldName: string;
  originalName: string;
  encoding: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
}

@ApiBearerAuth()
@ApiTags('Images')
@Controller('image')
export class CloudFlareController {
  constructor(private readonly service: CloudFlareService) {}

  @Post('upload/alternative')
  @UseInterceptors(FileInterceptor2())
  async upload(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'File should be less than 1MB please',
          }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: FileInfo,
  ) {
    console.log({ ...body, filename: file.originalName });
  }

  @ApiOperation({ summary: 'Realizar Upload de imagem' })
  @ApiResponse({
    status: 201,
    description: 'Upload realizado com sucesso',
    type: UploadImgCloudFlareResponseDto,
  })
  @ApiResponse({
    status: CLOUD_FLARE_ERRORS.INVALID_IMAGE.getStatus(),
    description: CLOUD_FLARE_ERRORS.INVALID_IMAGE.message,
  })
  @ApiResponse({
    status: CLOUD_FLARE_ERRORS.INVALID_SIZE.getStatus(),
    description: CLOUD_FLARE_ERRORS.INVALID_SIZE.message,
  })
  @ApiResponse({
    status: CLOUD_FLARE_ERRORS.UPLOAD_IMAGE.getStatus(),
    description: CLOUD_FLARE_ERRORS.UPLOAD_IMAGE.message,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImgCloudFlareDto })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadImgCloudFlareResponseDto> {
    return this.service.uploadImage(file);
  }

  @ApiOperation({ summary: 'Excluir imagem' })
  @ApiResponse({
    status: 204,
    description: 'Exclusão realizada com sucesso',
  })
  @ApiResponse({
    status: CLOUD_FLARE_ERRORS.UPLOAD_IMAGE.getStatus(),
    description: CLOUD_FLARE_ERRORS.DELETE_IMAGE.message,
  })
  @HttpCode(204)
  @Delete(':id')
  async deleteImage(@Param() params: IDQueryDTO): Promise<void> {
    return await this.service.deleteImage(params.id);
  }
}
