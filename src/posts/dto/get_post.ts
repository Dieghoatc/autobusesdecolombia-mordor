import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostDto {
  @ApiProperty({ example: 1, description: 'Numeric post ID' })
  @Type(() => Number)
  @IsInt()
  id: number;
}
