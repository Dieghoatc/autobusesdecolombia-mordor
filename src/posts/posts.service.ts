import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { TursoService } from 'src/services/turso.service';

@Injectable()
export class PostsService {
  private tursoContection = new TursoService().tursoConection();

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAllPost() {
    try {
      const result = await this.tursoContection.execute('SELECT * FROM posts');
      return result.rows;
    } catch (error) {
      console.error('Error al conectar a la base de datos', error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
