import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleTypeDto {
  @ApiProperty({ example: 'Buseta', description: 'Nombre del tipo de vehículo (único)' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Vehículo de capacidad media, entre 20 y 30 pasajeros' })
  @IsOptional()
  @IsString()
  description?: string;
}
