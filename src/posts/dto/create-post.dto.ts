import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Image cannot be empty' })
  image_url: string;

  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug cannot be empty' })
  slug: string;

  @IsString()
  @IsNotEmpty({ message: 'Tags cannot be empty' })
  tags: string;

  @IsNotEmpty()
  content: any;
}
