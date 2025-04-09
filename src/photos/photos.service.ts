
import { UploadResultCloudinary } from './interfaces/photos.interface';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { createClient } from '@libsql/client';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photos.entitiesdev';

@Injectable()
export class PhotosService  {

  constructor(
    @InjectRepository(Photo)
    private readonly userRepository: Repository<Photo>,
  ) {}

  private CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  private CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  private CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  private environment = process.env.DEV_ENVIRONMENT;

  private turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  async getAllPhotos() {
    if (this.environment === "DEV") {
      try {
        return this.userRepository.query('SELECT * FROM photos');
      } catch (error) {
        console.error('Error al conectar a la base de datos', error);
      }
    }
    try {
      const result = await this.turso.execute('SELECT * FROM autobuses_photos_production');
      return result.rows;
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  ///////////////////////

  async findOne(id: number) {
    try {
      const result = await this.turso.execute(`SELECT * FROM autobuses_photos_production WHERE photo_id = ${id}`);
      return result.rows[0];
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  //////////////////////////////////////////

  async uploadImageFromBuffer(
    buffer: Buffer,    
    category: number,
    type: number,
    company: string,
    serial: string,
    bodywork: string,
    chassis: string,
    plate: string,
    service: string,
    author: string,
    isInternational: number,
    country: string,
    location: string,
    
  ) {
    cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    const UploadResultCloudinary: UploadResultCloudinary = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'autobusesdecolombia', // Carpeta en Cloudinary
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
      },
    );

    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Para usar el formato de 24 horas
    };

    const dateCol = date.toLocaleDateString('es-CO', options);

    try {
      await this.turso.execute({
        sql: 'INSERT INTO autobuses_photos_production VALUES (:photo_id, :category_id, :type_id, :url, :company, :serial, :bodywork, :chassis, :plate, :service, :author, :id_international, :country, :location, :create_at)',
        args: {
          photo_id: null,
          category_id: category,
          type_id: type,
          url: UploadResultCloudinary.secure_url,
          company: company,
          serial: serial,
          bodywork: bodywork,
          chassis: chassis,
          plate: plate,
          service: service,
          author: author,
          id_international: isInternational,
          country: country,
          location: location,
          create_at: dateCol,
        },
      });
    } catch (error) {
      throw new Error('Error al insertar la foto');
    }
    return;
  }
}
