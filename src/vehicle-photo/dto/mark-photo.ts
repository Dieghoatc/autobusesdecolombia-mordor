import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MarkPhotoDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del fotógrafo a marcar en la imagen' })
  @IsString()
  author: string;

  @ApiPropertyOptional({ example: 'Medellín, Colombia' })
  @IsString()
  @IsOptional()
  location: string;
}
