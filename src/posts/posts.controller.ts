import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }
    if (file.mimetype !== 'image/webp') {
      throw new Error('Formato de archivo no soportado.');
    }
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande.');
    }

    const base64Data = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Data}`;
    const formatBase64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    const buffer = Buffer.from(formatBase64Data, 'base64');
    return this.postsService.create(createPostDto, buffer);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
