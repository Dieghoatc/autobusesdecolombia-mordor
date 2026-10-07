import { IsOptional, IsInt, Min, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PhotoFilterDto {
  @ApiPropertyOptional({ example: 1, minimum: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, description: 'Results per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({ example: 4, description: 'Filter by photographer ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  photographer_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by country ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  country_id?: number;

  @ApiPropertyOptional({ example: 2, description: 'Filter by vehicle type ID (via the associated vehicle)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  vehicle_type_id?: number;

  @ApiPropertyOptional({ example: 1, description: 'Filter by transport category ID (via the associated vehicle)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  transport_category_id?: number;

  @ApiPropertyOptional({ example: 3, description: 'Filter by transport company ID (via the associated vehicle)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  company_id?: number;

  @ApiPropertyOptional({ example: 'nocturna', description: 'Partial match on the tags field' })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiPropertyOptional({ example: 'published', description: 'Filter by exact photo status' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'Bogotá', description: 'Free-text search over location, description and tags' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ example: '2026-01-01', description: 'Minimum creation date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  created_from?: string;

  @ApiPropertyOptional({ example: '2026-12-31', description: 'Maximum creation date (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  created_to?: string;
}
