import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { PostDao } from './dao/posts.dao';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostDao],
  imports: [TypeOrmModule.forFeature([Posts])],
  exports: [TypeOrmModule],
})
export class PostsModule {}
