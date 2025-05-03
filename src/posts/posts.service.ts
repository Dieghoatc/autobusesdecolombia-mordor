import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TursoService } from 'src/services/turso.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';

import { ImageConvert } from 'src/utils/imageConvert';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  private tursoConection = new TursoService().tursoConection();
  private cloudinaryService = new CloudinaryService();
  private imageConvert = new ImageConvert();

  ///////////////////////////////////////////////////////
  // Upload image
  async uploadImage(file: Express.Multer.File) {
    const outputWebp = await this.imageConvert.toWebp(file);

    return await this.cloudinaryService.uploadImage('post', outputWebp);
  }

  ///////////////////////////////////////////////////////

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
      const createPost = this.postRepository.create(postData);
      return this.postRepository.save(createPost);

    } catch (error) {
      console.error('Error connecting to the database', error);
    }
  }

  async findAll() {
    try {
      return await this.postRepository.find();
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.postRepository.findOne({ where: { post_id: id } });
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
