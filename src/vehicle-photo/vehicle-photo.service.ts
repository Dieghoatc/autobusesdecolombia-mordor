import { UploadResultCloudinary } from './interfaces/photos.interface';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { Injectable } from '@nestjs/common';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { VehiclePhotoPostgresDAO } from './dao/vehicle-photo-postgresql.dao';
import { PhotoWatermarkClient } from 'src/services/mark-photo/mark-photo';

@Injectable()
export class VehiclePhotoService {
  constructor(
    private readonly photoDao: VehiclePhotoPostgresDAO,
    private readonly photowhatermarkClient: PhotoWatermarkClient,
  ) {}

  private urlApi =
    process.env.NODE_ENV === 'production'
      ? 'https://api.autobusesdecolombia.com/'
      : process.env.NODE_ENV === 'staging'
        ? 'https://abcdev1-production.up.railway.app/'
        : 'http://localhost:3000/';

  async getPhotos() {
    const page = 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const photosQuery = this.photoDao.findAllPaginated(limit, offset);
    const totalCountQuery = this.photoDao.findCount();

    const [photosResult, totalCountResult] = await Promise.all([
      photosQuery,
      totalCountQuery,
    ]);

    const startItem = offset + 1;
    const endItem = Math.min(offset + limit, totalCountResult);
    const totalPages = Math.ceil(totalCountResult / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    const nextPage = `${this.urlApi}photos/2`;

    return {
      info: {
        count: totalCountResult,
        pages: totalPages,
        limit: limit,
        next: nextPage,
        hasNext: hasNext,
        hasPrev: hasPrev,
        startItem: startItem,
        endItem: endItem,
      },
      data: photosResult,
    };
  }

  async getPhotosPagination(paginationDto: QueryPaginationDto) {
    const { page = 1, limit = paginationDto.limit ?? 20 } = paginationDto;
    const offset = (page - 1) * limit;

    const photosQuery = this.photoDao.findAllPaginated(limit, offset);
    const totalCountQuery = this.photoDao.findCount();

    const [photosResult, totalCountResult] = await Promise.all([
      photosQuery,
      totalCountQuery,
    ]);

    const startItem = offset + 1;
    const endItem = Math.min(offset + limit, totalCountResult);
    const totalPages = Math.ceil(totalCountResult / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    const nextPage = `${this.urlApi}photos/${page === totalPages ? totalPages : page + 1}`;
    const prevPage = `${this.urlApi}photos/${page === 1 ? 1 : page - 1}`;

    return {
      info: {
        count: totalCountResult,
        pages: totalPages,
        limit: limit,
        next: nextPage,
        prev: prevPage,
        hasNext: hasNext,
        hasPrev: hasPrev,
        startItem: startItem,
        endItem: endItem,
      },
      data: photosResult,
    };
  }

  async getPhotoById(id: number) {
    const photoQuery = this.photoDao.findById(id);
    return photoQuery;
  }

  async markPhotoService(
    file: Express.Multer.File,
    author: string,
    location?: string,
  ) {
    return await this.photowhatermarkClient.markPhoto(file, author, location);
  }

  // async getAllPhotos() {
  //   try {
  //     const result = await this.turso.execute(
  //       'SELECT * FROM autobuses_photos_production',
  //     );
  //     return result.rows;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async getPhotosForType(type: number) {
  //   try {
  //     const result = await this.turso.execute(
  //       `SELECT * FROM autobuses_photos_production WHERE type_id = ${type}`,
  //     );
  //     return result.rows;
  //   } catch (error) {
  //     console.error('Error connect to the database:');
  //     console.error(error);
  //   }
  // }

  // async findOne(id: number) {
  //   try {
  //     const result = await this.turso.execute(
  //       `SELECT * FROM autobuses_photos_production WHERE photo_id = ${id}`,
  //     );
  //     return result.rows[0];
  //   } catch (error) {
  //     console.error('Error connect to the database:');
  //     console.error(error);
  //   }
  // }

  ////////////////////UPLOAD TO CLOUDINARY AND INSERT TO DATABASE //////////////////////

  // async uploadImageFromBuffer(
  //   buffer: Buffer,
  //   category: number,
  //   type: number,
  //   company: string,
  //   serial: string,
  //   bodywork: string,
  //   chassis: string,
  //   plate: string,
  //   service: string,
  //   author: string,
  //   isInternational: number,
  //   country: string,
  //   location: string,
  // ) {
  //   cloudinary.config({
  //     cloud_name: this.CLOUDINARY_CLOUD_NAME,
  //     api_key: this.CLOUDINARY_API_KEY,
  //     api_secret: this.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  //   });

  //   const UploadResultCloudinary: UploadResultCloudinary = await new Promise(
  //     (resolve, reject) => {
  //       const uploadStream = cloudinary.uploader.upload_stream(
  //         {
  //           folder: 'autobusesdecolombia', // Carpeta en Cloudinary
  //           resource_type: 'image',
  //         },
  //         (error, result) => {
  //           if (error) {
  //             reject(error);
  //           } else {
  //             resolve(result);
  //           }
  //         },
  //       );
  //       streamifier.createReadStream(buffer).pipe(uploadStream);
  //     },
  //   );

  //   const date = new Date();

  //   const options: Intl.DateTimeFormatOptions = {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false, // Para usar el formato de 24 horas
  //   };

  //   const dateCol = date.toLocaleDateString('es-CO', options);

  //   try {
  //     await this.turso.execute({
  //       sql: 'INSERT INTO autobuses_photos_production VALUES (:photo_id, :category_id, :type_id, :url, :company, :serial, :bodywork, :chassis, :plate, :service, :author, :id_international, :country, :location, :create_at)',
  //       args: {
  //         photo_id: null,
  //         category_id: category,
  //         type_id: type,
  //         url: UploadResultCloudinary.secure_url,
  //         company: company,
  //         serial: serial,
  //         bodywork: bodywork,
  //         chassis: chassis,
  //         plate: plate,
  //         service: service,
  //         author: author,
  //         id_international: isInternational,
  //         country: country,
  //         location: location,
  //         create_at: dateCol,
  //       },
  //     });
  //   } catch (error) {
  //     throw new Error('Error al insertar la foto');
  //   }
  //   return;
  // }
}
