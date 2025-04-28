import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryPhoto } from './types';

export class CloudinaryService {
  private CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  private CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  private CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  constructor() {
    cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
  }

  async uploadImage(folder: string, buffer: Buffer) {
    const UploadResultCloudinary: CloudinaryPhoto = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder, // Carpeta en Cloudinary
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

    try {
      return UploadResultCloudinary.secure_url;
    } catch (error) {
      throw new Error('Error uploading image to cloudinary');
    }
  }
}
