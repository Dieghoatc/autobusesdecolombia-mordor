// DTO is a data transfer object, it is currently used to validate the data that is sent to the controller

import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PhotoDTO {

  @ApiProperty({ example: 12, description: 'ID del vehículo fotografiado' })
  @Type(() => Number)
  @IsNumber()
  vehicle_id: number;

  @ApiProperty({ example: 'https://res.cloudinary.com/.../foto.webp' })
  @IsString()
  image_url: string;

  @ApiProperty({ example: 4, description: 'ID del fotógrafo' })
  @Type(() => Number)
  @IsNumber()
  photographer_id: number;

  @ApiProperty({ example: 1, description: 'ID del país' })
  @Type(() => Number)
  @IsNumber()
  country_id: number;

  @ApiProperty({ example: 'Bogotá, Colombia' })
  @IsString()
  location: string;
}
