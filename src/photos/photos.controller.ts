import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';

interface RequestBody {
  image: string;
  company: string;
  serial: string;
  bodywork: string;
  chassis: string;
  author: string;
  description: string;
  category: string;
  plate: string;
}

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  getAllPhotos() {
    return this.photosService.getAllPhotos();
  }

  // upload
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: RequestBody,
  ) {

    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }
    if (file.mimetype !== 'image/webp') {
      throw new Error('Formato de archivo no soportado.');
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande.');
    }
    const base64Data = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Data}`;

    const company = body.company;
    const serial = body.serial;
    const bodywork = body.bodywork;
    const chassis = body.chassis;
    const author = body.author;
    const description = body.description;
    const category = body.category;
    const plate = body.plate;

    const formatBase64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    const buffer = Buffer.from(formatBase64Data, 'base64');

    try {
      const result = await this.photosService.uploadImageFromBuffer(
        buffer,
        company,
        serial,
        bodywork,
        chassis,
        author,
        description,
        category,
        plate,
      );
      return {
        message: 'Image uploaded successfully',
        url: result,
      };
    } catch (error) {
      return {
        message: 'Error uploading image',
        error: error.message,
      };
    }
  }
}
