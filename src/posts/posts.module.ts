import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { PostDao } from './dao/posts.dao';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostDao],
  imports: [TypeOrmModule.forFeature([Posts]), RedisModule],
  exports: [TypeOrmModule],
})
export class PostsModule {}
