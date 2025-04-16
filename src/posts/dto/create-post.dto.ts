import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

  content: any;
}
