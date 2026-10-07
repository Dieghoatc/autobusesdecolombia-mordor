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
import { OptimizePhotoDto } from './dto/optimize-photo.dto';
import { VehiclePhotoService } from './vehicle-photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoFilterDto } from './dto/photo-filter.dto';
import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
import { AdminOnly } from '../auth/decorators/auth.decorator';
import { UploadTokenAllowed } from '../auth/decorators/upload-token.decorator';

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

  @ApiOperation({
    summary: 'Convert a photo to an optimized AVIF (no watermark)',
    description:
      'Accepts JPG, PNG, WebP or AVIF. Keeps the original resolution and applies the EXIF orientation. ' +
      'Uses the same AVIF defaults as Squoosh (quality 50); `quality` can be adjusted from 1 to 100.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        quality: { type: 'integer', minimum: 1, maximum: 100, example: 50 },
      },
      required: ['image'],
    },
  })
  @AdminOnly()
  @UploadTokenAllowed()
  @Post('optimize')
  @UseInterceptors(
    FileInterceptor('image', { storage: multer.memoryStorage() }),
  )
  async optimizeImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() optimizePhotoDto: OptimizePhotoDto,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new HttpException('Image not found', HttpStatus.BAD_REQUEST);
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new HttpException('Image size exceeds 5MB', HttpStatus.BAD_REQUEST);
    }

    const buffer = await this.photoService.optimizePhotoService(
      file,
      optimizePhotoDto.quality,
    );

    const filename = `optimized_${file.originalname.split('.')[0]}.avif`;
    res.setHeader('Content-Type', 'image/avif');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    return res.send(buffer);
  }

  @ApiOperation({
    summary: 'Watermark an image with the photographer name and location, returns a .avif',
    description:
      'Adds the logo (bottom left) and the author and city (bottom right). Keeps the original ' +
      'resolution, applies the EXIF orientation and encodes AVIF (quality 50 by default, like Squoosh).',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
        author: { type: 'string' },
        location: { type: 'string' },
        quality: { type: 'integer', minimum: 1, maximum: 100, example: 50 },
      },
      required: ['image', 'author'],
    },
  })
  @AdminOnly()
  @UploadTokenAllowed()
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
      throw new HttpException('Author not found', HttpStatus.BAD_REQUEST);
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new HttpException('Image size exceeds 5MB', HttpStatus.BAD_REQUEST);
    }

    const buffer = await this.photoService.markPhotoService(
      file,
      markPhotoDto.author,
      markPhotoDto.location,
      markPhotoDto.quality,
    );

    const filename = `marked_${file.originalname.split('.')[0]}.avif`;
    res.setHeader('Content-Type', 'image/avif');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    return res.send(buffer);
  }
}
