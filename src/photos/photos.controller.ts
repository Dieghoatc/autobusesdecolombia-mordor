import { Controller, Get, Post, UseInterceptors, Body } from '@nestjs/common';
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
  async uploadImage(@Body() body: RequestBody) {
    const company = body.company;
    const serial = body.serial;
    const bodywork = body.bodywork;
    const chassis = body.chassis;
    const author = body.author;
    const description = body.description;
    const category = body.category;
    const plate = body.plate;

    const imageData = body.image;
    const base64Data = imageData.replace(/^data:image\/webp;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

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
        plate
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
