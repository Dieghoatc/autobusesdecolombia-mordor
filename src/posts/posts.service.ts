import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { PostDao } from './dao/posts.dao';

import { ImageConvert } from 'src/utils/imageConvert';

@Injectable()
export class PostsService {
  constructor(private readonly postDao: PostDao) {}

  private cloudinaryService = new CloudinaryService();
  private imageConvert = new ImageConvert();

  async uploadImage(file: Express.Multer.File) {
    const outputWebp = await this.imageConvert.toWebp(file);

    return await this.cloudinaryService.uploadImage('post', outputWebp);
  }

  async create(data: CreatePostDto, file: Express.Multer.File) {
    const outputWebp = await this.imageConvert.toWebp(file);

    const urlUploadCloudinary = await this.cloudinaryService.uploadImage(
      'post',
      outputWebp,
    );

    try {
      const postData = {
        ...data,
        image: urlUploadCloudinary,
      };
      return this.postDao.create(postData);
    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }

  async findAll() {
    return this.postDao.findAllPosts();
  }

  async findOne(id: number) {
    return await this.postDao.findPostByID(id);
  }
}
