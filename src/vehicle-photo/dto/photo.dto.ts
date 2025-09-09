// DTO is a data transfer object, it is currently used to validate the data that is sent to the controller

import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PhotoDTO {

  @Type(() => Number)
  @IsNumber()
  vehicle_id: number;

  @IsString()
  image_url: string;

  @Type(() => Number)
  @IsNumber()
  photographer_id: number;

  @Type(() => Number)
  @IsNumber()
  country_id: number;

  @IsString()
  location: string;
}

export class PhotoDto2 {
  @IsNumber()
  @Min(1, { message: 'Page should be greater than 0' })
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @Min(1, { message: 'Limit should be greater than 0' })
  @Max(100, { message: 'Maximum limit is 100' })
  @IsOptional()
  limit: number = 10;

  @IsString()
  photo_id: string;

  @IsString()
  category: string;

  @IsString()
  vehicle: string;

  @IsString()
  image_url: string;

  @IsString()
  Brand: string;

  @IsString()
  company: string;

  @IsString()
  serial_company: string;

  @IsString()
  serial_id: string;

  @IsString()
  chassis: string;

  @IsString()
  bodywork: string;

  @IsString()
  plate: string;

  @IsString()
  service: string;

  @IsString()
  photographer: string;

  @IsString()
  location: string;

  @IsString()
  country: string;

  @IsString()
  created_at: string;
}
