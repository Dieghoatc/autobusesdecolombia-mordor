import { HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import * as FormData from 'form-data'; 

export class PhotoWatermarkClient {
  private readonly URL_LOCAL =
    process.env.IMAGE_MARK_SERVICE_URL || 'http://localhost:8000';

  async markPhoto(
    file: Express.Multer.File,
    author: string,
    location?: string,
  ): Promise<Buffer> {
    try {
      const formData = new FormData();

      formData.append('image', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      formData.append('author', author);
      formData.append('location', location || 'No especificado');

      const response = await axios.post(`${this.URL_LOCAL}`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
        timeout: 50000,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error client API', error);

      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        let message = error.message;

        if (error.response?.data) {
          if (error.response.data instanceof ArrayBuffer) {
            message = new TextDecoder().decode(error.response.data);
          } else {
            message = error.response.data;
          }
        }

        console.error('Axios Error:', {
          status,
          message,
          url: error.config?.url,
        });

        throw new HttpException(
          `Error procesando imagen: ${status} - ${message}`,
          status >= 400 && status < 500
            ? HttpStatus.BAD_REQUEST
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      throw new HttpException(
        'Error processing image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Verify Connectivity Service
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.URL_LOCAL}/`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('FastAPI service is not available:', error.message);
      return false;
    }
  }
}
