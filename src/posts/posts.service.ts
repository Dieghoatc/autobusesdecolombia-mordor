import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { TursoService } from 'src/services/turso.service';

@Injectable()
export class PostsService {
  private tursoConection = new TursoService().tursoConection();

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAllPost() {
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
