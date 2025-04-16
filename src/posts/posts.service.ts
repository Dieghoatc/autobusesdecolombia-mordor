import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { TursoService } from 'src/services/turso.service';
import {InjectRepository} from '@nestjs/typeorm'
import { Post } from './post.entity';
import { Repository } from 'typeorm'; // Import the Repository class from TypeORM: is a wrapper around the PostgreSQL database
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { UploadResultCloudinary } from 'src/photos/interfaces/photos.interface';

@Injectable()
export class PostsService {

  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {
    console.log('🧪 Post Repository:', this.postRepository.target);
  }  

  private CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  private CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  private CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  private tursoConection = new TursoService().tursoConection();

  async create(data: CreatePostDto, buffer: Buffer) {
    cloudinary.config({
      cloud_name: this.CLOUDINARY_CLOUD_NAME,
      api_key: this.CLOUDINARY_API_KEY,
      api_secret: this.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });

    const UploadResultCloudinary: UploadResultCloudinary = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'post', // Carpeta en Cloudinary
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
      const postData = {
        ...data,
        image: UploadResultCloudinary.secure_url,
      }
      const createPost = this.postRepository.create(postData);     
      
      return this.postRepository.save(createPost);
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  async findAll() {
    try {
      const result = await this.tursoConection.execute('SELECT * FROM posts');
      return result.rows;
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.tursoConection.execute(
        `SELECT * FROM posts WHERE post_id = ${id}`,
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
