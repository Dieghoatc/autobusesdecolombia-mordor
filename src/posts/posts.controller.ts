import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetPostDto } from './dto/get_post';
import { RedisService } from 'src/redis/redis.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private readonly redisService: RedisService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.create(createPostDto, file);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async ploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        message: 'No file received',
      };
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      return {
        message: 'The file is too large',
      };
    }

    const imageUrl = await this.postsService.uploadImage(file);
    return {
      success: 1,
      file: {
        url: imageUrl, // La URL que se insertará en el editor
      },
    };
  }

  @Get()
  async findAll() {
    const cacheKey = `posts`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.postsService.findAll();
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
  }

  @Get(':id')
  async findOne(@Param() params: GetPostDto) {
    const cacheKey = `post_${params.id}`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.postsService.findOne(params.id);
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
  }
}
