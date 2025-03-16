import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Param
} from '@nestjs/common';
import { PhotoDto } from './dto/photo.dto/photo.dto';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  getAllPhotos() {
    return this.photosService.getAllPhotos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(+id);
  }

  // upload
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() photoDto: PhotoDto,
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

    const category = photoDto.category;
    const type = photoDto.type;
    const company = photoDto.company;
    const serial = photoDto.serial;
    const bodywork = photoDto.bodywork;
    const chassis = photoDto.chassis;
    const plate = photoDto.plate;
    const service = photoDto.service;
    const author = photoDto.author;
    const isInternational = photoDto.is_international;
    const country = photoDto.country; 
    const location = photoDto.location;

    const formatBase64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    const buffer = Buffer.from(formatBase64Data, 'base64');

    try {
      const result = await this.photosService.uploadImageFromBuffer(
        buffer,
        category,
        type,
        company,
        serial,
        bodywork,
        chassis,
        plate,
        service,
        author,
        isInternational,
        country,
        location
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
