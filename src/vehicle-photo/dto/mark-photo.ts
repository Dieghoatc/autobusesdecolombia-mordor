import { IsOptional, IsString } from 'class-validator';

export class MarkPhotoDto {
  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  location: string;
}
