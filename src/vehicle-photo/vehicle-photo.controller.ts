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
import { MarkPhotoDto } from './dto/mark-photo';
import { VehiclePhotoService } from './vehicle-photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoFilterDto } from './dto/photo-filter.dto';
import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
import { AdminOnly } from '../auth/decorators/auth.decorator';

@ApiTags('vehicle-photos')
@Controller('photo')
export class VehiclePhotoController {
  constructor(private readonly photoService: VehiclePhotoService) {}

  @ApiOperation({ summary: 'List all vehicle photos (no filters, first 20)' })
  @Get()
  getPhotos() {
    return this.photoService.getPhotos();
  }

  @ApiOperation({
    summary: 'List paginated vehicle photos, with gallery filters',
    description:
      'Filter by photographer, country, vehicle type, transport category, company, tags, status, date range and free-text search (location/description/tags).',
  })
  @Get('page')
  getPhotosPagination(@Query() query: PhotoFilterDto) {
    return this.photoService.getPhotosPagination(query);
  }

  @ApiOperation({ summary: 'Get a photo by ID' })
  @ApiParam({ name: 'id', example: 10 })
  @ApiNotFoundResponse({ description: 'Photo not found' })
  @Get(':id')
  getPhotoById(@Param('id') id: string) {
    return this.photoService.getPhotoById(+id);
  }

  @ApiOperation({ summary: 'Watermark an image with the photographer name and location, returns a .avif' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        author: { type: 'string' },
        location: { type: 'string' },
      },
      required: ['image', 'author'],
    },
  })
  @AdminOnly()
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
}
