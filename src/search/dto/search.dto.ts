import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchPaginationDTO {

  @ApiPropertyOptional({ example: 'busetón', description: 'Text to search for' })
  @IsOptional()
  @Type(() => String)
  @IsString()
  q: string;

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
}
