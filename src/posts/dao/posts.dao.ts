import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostDao {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async findAllPosts(): Promise<Posts[]> {
    return await this.postRepository.find();
  }

  async findPostByID(id: number): Promise<Posts> {
    return await this.postRepository.findOne({ where: { post_id: id } });
  }

  async create(post: any): Promise<Posts> {
    return await this.postRepository.save(post);
  }
}
