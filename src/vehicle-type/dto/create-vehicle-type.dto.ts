import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleTypeDto {
  @ApiProperty({ example: 'Buseta', description: 'Vehicle type name (unique)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Mid-capacity vehicle, between 20 and 30 passengers' })
  @IsOptional()
  @IsString()
  description?: string;
}
