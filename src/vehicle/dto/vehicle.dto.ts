import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleDTO {

    @ApiPropertyOptional({ example: 101, description: 'ID del vehículo (solo lectura/actualización)' })
    @Type(() => Number)
    @IsOptional()
    @IsString()
    vehicle_id?: number;

    @ApiPropertyOptional({ example: 2, description: 'ID del tipo de vehículo' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    vehicle_type_id?: number;

    @ApiPropertyOptional({ example: 5, description: 'ID del modelo' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    model_id?: number;

    @ApiPropertyOptional({ example: 3, description: 'ID de la empresa transportadora' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_id?: number;

    @ApiPropertyOptional({ example: 1, description: 'ID de la categoría de transporte' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    transport_category_id?: number;

    @ApiPropertyOptional({ example: 'INT-4521', description: 'Serial interno de la empresa' })
    @IsOptional()
    @IsString()
    company_serial: string;

    @ApiPropertyOptional({ example: 2, description: 'ID del servicio de la empresa' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_service_id?: number;

    @ApiPropertyOptional({ example: 'ABC123', description: 'Placa del vehículo' })
    @IsOptional()
    @IsString()
    plate?: string;

    @ApiPropertyOptional({ example: 4, description: 'ID del fotógrafo' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    photographer_id?: number;

    @ApiProperty({ example: 'Medellín, Colombia' })
    @IsString()
    location: string;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Archivo de foto del vehículo (multipart/form-data)' })
    photo?: any;
}
