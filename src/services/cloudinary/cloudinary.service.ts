import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { Logger } from '@nestjs/common';

interface CloudinaryResponse {
  secure_url: string;
}

export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor() {
    this.configureCloudinary();
  }

  private configureCloudinary(): void {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error(
        'Cloudinary configuration is missing. Please check your environment variables.',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    this.logger.log('Cloudinary configured successfully');
  }

  async uploadImage(folder: string, buffer: Buffer): Promise<string> {
    try {
      const uploadResult: CloudinaryResponse = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folder, // Carpeta en Cloudinary
              resource_type: 'image',
            },
            (error, result) => {
              if (error) {
                this.logger.error('Cloudinary upload error:', error);
                reject(new Error(`Cloudinary upload failed: ${error.message}`));
              } else if (!result) {
                reject(new Error('Upload result is undefined'));
              } else {
                resolve(result as CloudinaryResponse);
              }
            },
          );
          streamifier.createReadStream(buffer).pipe(uploadStream);
        },
      );
      
      this.logger.log(`Image uploaded successfully: ${uploadResult.secure_url}`);
      return uploadResult.secure_url;

    } catch (error) {
      this.logger.error('Error uploading image to Cloudinary:', error);
      throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
