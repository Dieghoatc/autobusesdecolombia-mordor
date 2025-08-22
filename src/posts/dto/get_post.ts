import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostDto {
  @Type(() => Number)
  @IsInt()
  id: number;
}
