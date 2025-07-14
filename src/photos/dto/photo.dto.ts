// DTO is a data transfer object, it is currently used to validate the data that is sent to the controller

import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class PhotoDto {
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
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  serial?: string;

  @IsString()
  @IsOptional()
  bodywork?: string;

  @IsString()
  @IsOptional()
  chassis?: string;

  @IsString()
  @IsOptional()
  plate?: string;

  @IsString()
  @IsOptional()
  service?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  isInternational?: string;
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
  mark: string;

  @IsString()
  company: string;

  @IsString()
  serial_company: string;

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

  @IsString()
  last_modification: string;  

  @IsString()
  active: boolean;
}

