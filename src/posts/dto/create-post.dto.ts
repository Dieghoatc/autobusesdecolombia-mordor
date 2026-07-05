import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'https://res.cloudinary.com/.../cover.jpg', description: 'URL de la imagen de portada' })
  @IsString()
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image_url: string;

  @ApiProperty({ example: 'Los mejores buses de Colombia en 2026', description: 'Título del post' })
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ example: 'mejores-buses-colombia-2026', description: 'Slug único para la URL' })
  @IsString()
  @IsNotEmpty({ message: 'Slug cannot be empty' })
  slug: string;

  @ApiProperty({ example: 'buses,colombia,noticias', description: 'Tags separados por coma' })
  @IsString()
  @IsNotEmpty({ message: 'Tags cannot be empty' })
  tags: string;

  @ApiProperty({ description: 'Contenido del post (bloques del editor)' })
  @IsNotEmpty()
  content: any;
}
