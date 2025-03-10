import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
// import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';
import { CLOUD_FLARE_ERRORS } from '../constants/cloud-flare.errors';
// import FormData from 'form-data';
// import * as FormData from 'form-data';
import FormData = require('form-data');
import { UploadImgCloudFlareResponseDto } from '../dto/update-img-cloud-flare-response.dto';
import { UploadImageResponse } from '../types/cloud-flare.types';
//this works in vercel, solution link: https://github.com/form-data/form-data/issues/484

@Injectable()
export class CloudFlareService {
  private readonly logger = new Logger(CloudFlareService.name);

  private readonly accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  private readonly apiToken = `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`;

  constructor(private readonly httpService: HttpService) {}

  private validUploadImage(file: Express.Multer.File): void {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!allowedMimeTypes.includes(file.mimetype))
      throw CLOUD_FLARE_ERRORS.INVALID_IMAGE;

    // const maxSize = 10 * 1024 * 1024;
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (file.size > maxSize) throw CLOUD_FLARE_ERRORS.INVALID_SIZE;
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadImgCloudFlareResponseDto> {
    console.log(file);
    // this.validUploadImage(file);

    const filename = file.originalname;
    const image = file.buffer;

    try {
      const formData = new FormData();
      formData.append('file', image, {
        filename: filename,
        contentType: file.mimetype,
      });

      const response = await lastValueFrom(
        this.httpService.post(
          `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              Authorization: this.apiToken,
            },
          },
        ),
      );

      const data = response.data.result as UploadImageResponse;

      return new UploadImgCloudFlareResponseDto(data);
    } catch (error) {
      // console.log(error.response.data);
      this.logger.error('Erro ao fazer upload da imagem:', error.message);
      throw CLOUD_FLARE_ERRORS.UPLOAD_IMAGE;
    }
  }

  async deleteImage(id: string): Promise<void> {
    try {
      await lastValueFrom(
        this.httpService.delete(
          `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/images/v1/${id}`,
          {
            headers: {
              Authorization: this.apiToken,
            },
          },
        ),
      );
    } catch (error) {
      this.logger.error('Erro ao apagar imagem:', error.message);
      throw CLOUD_FLARE_ERRORS.DELETE_IMAGE;
    }
  }
}
