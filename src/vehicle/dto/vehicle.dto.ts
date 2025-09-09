import { IsOptional, IsString } from 'class-validator';

export class VehicleDTO {

    @IsOptional()
    @IsString()
    vehicle_id: string;

    @IsOptional()
    @IsString()
    vehicle_type_id: string;

    @IsOptional()
    @IsString()
    model_id: string;

    @IsOptional()
    @IsString()
    company_id: string;

    @IsString()
    transport_category_id: string;

    @IsOptional()
    @IsString()
    company_serial: string;

    @IsOptional()
    @IsString()
    company_service_id: string;

    @IsOptional()
    @IsString()
    plate: string;

    @IsString()
    photographer_id: string;

    @IsString()
    location: string;
}
