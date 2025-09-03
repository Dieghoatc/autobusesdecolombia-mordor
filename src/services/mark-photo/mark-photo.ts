import { HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import * as FormData from 'form-data'; // CORRECCIÓN 1: Cambiar importación

export class PhotoWatermarkClient {
  private readonly URL_LOCAL = 'http://localhost:8000';

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
      // CORRECCIÓN 2: Tu FastAPI requiere location, no puede estar vacío
      formData.append('location', location || 'No especificado');

      const response = await axios.post(`${this.URL_LOCAL}/upload/`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
        timeout: 30000,
        // CORRECCIÓN 3: Agregar estas opciones para archivos grandes
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      });

      return Buffer.from(response.data);
    } catch (error) {
      console.error('Error client API', error);

      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        // CORRECCIÓN 4: Mejorar manejo del mensaje de error
        let message = error.message;

        if (error.response?.data) {
          // Si la respuesta es un buffer, convertirla a string
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

  // BONUS: Método para verificar conectividad
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
