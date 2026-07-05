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
import { QueryPaginationDto } from './dto/query-pagination.dto';
import * as multer from 'multer';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('vehicle-photos')
@Controller('photo')
export class VehiclePhotoController {
  constructor(private readonly photoService: VehiclePhotoService) {}

  @ApiOperation({ summary: 'Lista todas las fotos de vehículos' })
  @Get()
  getPhotos() {
    return this.photoService.getPhotos();
  }

  @ApiOperation({ summary: 'Lista fotos de vehículos paginadas' })
  @Get('page')
  getPhotosPagination(@Query() query: QueryPaginationDto) {
    return this.photoService.getPhotosPagination(query);
  }

  @ApiOperation({ summary: 'Obtiene una foto por ID' })
  @ApiParam({ name: 'id', example: 10 })
  @Get(':id')
  getPhotoById(@Param('id') id: string) {
    return this.photoService.getPhotoById(+id);
  }

  @ApiOperation({ summary: 'Marca (watermark) una imagen con el nombre del fotógrafo y ubicación, devuelve un .avif' })
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
