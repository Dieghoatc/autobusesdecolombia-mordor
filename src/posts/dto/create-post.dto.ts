import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/.../cover.jpg', description: 'Cover image URL' })
  @IsString()
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image_url: string;

  @ApiProperty({ example: 'Los mejores buses de Colombia en 2026', description: 'Post title' })
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ example: 'mejores-buses-colombia-2026', description: 'Unique slug for the URL' })
  @IsString()
  @IsNotEmpty({ message: 'Slug cannot be empty' })
  slug: string;

  @ApiProperty({ example: 'buses,colombia,noticias', description: 'Comma-separated tags' })
  @IsString()
  @IsNotEmpty({ message: 'Tags cannot be empty' })
  tags: string;

  @ApiProperty({ description: 'Post content (editor blocks)' })
  @IsNotEmpty()
  content: any;
}
