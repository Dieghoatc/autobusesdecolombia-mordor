import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class VehicleDTO {

    @Type(() => Number)
    @Type(() => Number)
    @IsOptional()
    @IsString()
    vehicle_id?: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    vehicle_type_id?: number;;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    model_id?: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_id?: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    transport_category_id?: number;

    @IsOptional()
    @IsString()
    company_serial: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    company_service_id?: number;

    @IsOptional()
    @IsString()
    plate?: string;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    photographer_id?: number;

    @IsString()
    location: string;
}
