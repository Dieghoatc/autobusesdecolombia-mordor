import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class VehicleDTO {
    
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    vehicle_type_id: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    model_id: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    company_id: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    transport_category_id: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    company_serial_id: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    company_service_id: number;

    @Type(() => String)
    @IsNotEmpty()
    @IsOptional()
    plate: string;     

}
