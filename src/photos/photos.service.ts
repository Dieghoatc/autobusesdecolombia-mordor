import { Injectable } from '@nestjs/common';
import { UploadResultCloudinary } from './interfaces/photos.interface';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { createClient } from '@libsql/client';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PhotosService {
  private CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  private CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  private CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  private turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  async getAllPhotos() {
    const result = await this.turso.execute('SELECT * FROM photos');
    return result.rows;
  }

  ///////////////////////

  async uploadImageFromBuffer(
    buffer: Buffer,
    company: string,
    serial: string,
    bodywork: string,
    chassis: string,
    author: string,
    description: string,
  ) {
    cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    const uploadResult: UploadResultCloudinary = await new Promise(
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

    const uuid = uuidv4();

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
        sql: 'INSERT INTO photos VALUES (:photo_id,:url, :company, :serial, :bodywork, :chassis, :author, :create_at, :description)',
        args: {
          photo_id: null,
          url: uploadResult.url,
          company: company,
          serial: serial,
          bodywork: bodywork,
          chassis: chassis,
          author: author,
          create_at: dateCol,
          description: description,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
