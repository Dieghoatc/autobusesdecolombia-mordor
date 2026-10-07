import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DEFAULT_AVIF_QUALITY } from 'src/utils/imageConvert';

export class MarkPhotoDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Name of the photographer to watermark onto the image' })
  @IsString()
  author: string;

  @ApiPropertyOptional({ example: 'Medellín, Colombia' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiPropertyOptional({
    example: DEFAULT_AVIF_QUALITY,
    minimum: 1,
    maximum: 100,
    description: 'AVIF quality. Lower values give smaller files',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  quality?: number;
}
