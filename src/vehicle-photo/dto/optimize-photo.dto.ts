import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DEFAULT_AVIF_QUALITY } from 'src/utils/imageConvert';

export class OptimizePhotoDto {
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
