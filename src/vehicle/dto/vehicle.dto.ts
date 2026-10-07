import { IsOptional, IsString, IsNumber, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VehicleDTO {

    @ApiPropertyOptional({ example: 101, description: 'Existing vehicle to add the photo to. When omitted, a new vehicle is created' })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    vehicle_id?: number;

    @ApiPropertyOptional({ example: 2, description: 'Vehicle type ID' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    vehicle_type_id?: number;

    @ApiPropertyOptional({ example: 5, description: 'Model ID' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    model_id?: number;

    @ApiPropertyOptional({ example: 3, description: 'Transport company ID' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_id?: number;

    @ApiPropertyOptional({ example: 1, description: 'Transport category ID' })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    transport_category_id?: number;

    @ApiPropertyOptional({ example: 'INT-4521', description: "Company's internal serial" })
    @IsOptional()
    @IsString()
    company_serial: string;

    @ApiPropertyOptional({ example: 2, description: "Company's service ID" })
    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_service_id?: number;

    @ApiPropertyOptional({ example: 'ABC123', description: 'Vehicle plate' })
    @IsOptional()
    @IsString()
    plate?: string;

    @ApiProperty({ example: 4, description: 'Photographer ID' })
    @Type(() => Number)
    @IsInt()
    photographer_id: number;

    @ApiProperty({ example: 'Medellín, Colombia' })
    @IsString()
    location: string;

    @ApiProperty({ type: 'string', format: 'binary', description: 'Vehicle photo file (multipart/form-data)' })
    photo?: any;
}
