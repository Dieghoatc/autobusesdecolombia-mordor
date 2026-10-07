import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MarkPhotoDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Name of the photographer to watermark onto the image' })
  @IsString()
  author: string;

  @ApiPropertyOptional({ example: 'Medellín, Colombia' })
  @IsString()
  @IsOptional()
  location: string;
}
