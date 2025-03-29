import { IsString } from 'class-validator';

export class PhotoDto {
  @IsString({ message: 'Category: Should be a string and not empty' })
  category: string;
  @IsString({ message: 'Type:Should be a string and not empty' })
  type: string;
  @IsString({ message: 'Company:Should be a string and not empty' })
  company: string;
  @IsString({ message: 'Serial: Should be a string and not empty' })
  serial: string;
  @IsString({ message: 'Bodywork:Should be a string and not empty' })
  bodywork: string;
  @IsString({ message: 'Chassis: Should be a string and not empty' })
  chassis: string;
  @IsString({ message: 'Plate: Should be a string and not empty' })
  plate: string;
  @IsString({ message: 'Service: Should be a string and not empty' })
  service: string;
  @IsString({ message: 'Author: Should be a string and not empty' })
  author: string;
  @IsString({ message: 'Country: Should be a string and not empty' })
  country: string;
  @IsString({ message: 'Location:Should be a string and not empty' })
  location: string;
  
  @IsString({ message: 'Is international: Should be a string and not empty' })
  isInternational: string;
}
