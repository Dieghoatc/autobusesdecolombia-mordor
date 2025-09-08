import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Param,
  ValidationPipe,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { PhotoDto } from './dto/photo.dto';
import { MarkPhotoDto } from './dto/mark-photo';
import { VehiclePhotoService } from './vehicle-photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { categoryValidator } from './utils/categoryValidator';
import { typeCarValidator } from './utils/typeCarValidator';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import * as multer from 'multer';

@Controller('photo')
export class VehiclePhotoController {
  constructor(private readonly photoService: VehiclePhotoService) {}

  @Get()
  getPhotos() {
    return this.photoService.getPhotos();
  }

  @Get('page')
  getPhotosPagination(@Query() query: QueryPaginationDto) {
    return this.photoService.getPhotosPagination(query);
  }

  @Get(':id')
  getPhotoById(@Param('id') id: string) {
    return this.photoService.getPhotoById(+id);
  }

  @Post('mark')
  @UseInterceptors(
    FileInterceptor('image', { storage: multer.memoryStorage() }),
  )
  async markImage(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) markPhotoDto: MarkPhotoDto,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
    }
    if (!markPhotoDto.author) {
      throw new HttpException('Author not foud', HttpStatus.BAD_REQUEST);
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new HttpException('Image size exeds 5MB', HttpStatus.BAD_REQUEST);
    }
    try {
      const buffer = await this.photoService.markPhotoService(
        file,
        markPhotoDto.author,
        markPhotoDto.location,
      );

      const filename = `marked_${file.originalname.split('.')[0]}.avif`;
      res.setHeader('Content-Type', 'image/avif');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      return res.send(buffer);
    } catch (error) {
      console.error('Error en controlador:', error);
      throw error;
    }
  }

  // upload
  // @Post('image')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body(ValidationPipe) photoDto: PhotoDto,
  // ) {
  //   if (!file) {
  //     throw new Error('No se recibió ningún archivo');
  //   }
  //   if (file.mimetype !== 'image/webp') {
  //     throw new Error('Formato de archivo no soportado.');
  //   }
  //   const maxSize = 5 * 1024 * 1024; // 5 MB

  //   if (file.size > maxSize) {
  //     throw new Error('El archivo es demasiado grande.');
  //   }

  //   const base64Data = file.buffer.toString('base64');
  //   const dataUrl = `data:${file.mimetype};base64,${base64Data}`;
  //   const category = categoryValidator(photoDto.category);
  //   const type = typeCarValidator(photoDto.type);
  //   const company = photoDto.company;
  //   const serial = photoDto.serial;
  //   const bodywork = photoDto.bodywork;
  //   const chassis = photoDto.chassis;
  //   const plate = photoDto.plate;
  //   const service = photoDto.service;
  //   const author = photoDto.author;
  //   const isInternational = Number(photoDto.isInternational);
  //   const country = photoDto.country;
  //   const location = photoDto.location;
  //   const formatBase64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
  //   const buffer = Buffer.from(formatBase64Data, 'base64');

  //   try {
  //     const result = await this.photosService.uploadImageFromBuffer(
  //       buffer,
  //       category,
  //       type,
  //       company,
  //       serial,
  //       bodywork,
  //       chassis,
  //       plate,
  //       service,
  //       author,
  //       isInternational,
  //       country,
  //       location,
  //     );
  //     return {
  //       message: 'Image uploaded successfully controller',
  //       url: result,
  //     };
  //   } catch (error) {
  //     return {
  //       message: 'Error uploading image',
  //       error: error.message,
  //     };
  //   }
  // }
}
