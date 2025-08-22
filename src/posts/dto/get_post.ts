import { IsInt } from 'class-validator';

export class GetPostDto {
  @IsInt()
  id: number;
}
