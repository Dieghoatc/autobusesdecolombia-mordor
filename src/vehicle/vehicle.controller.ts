import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(':id') getVehicleById(
    @Param('id') id: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehicleById(+id, paginationDto);
  }

  @Get() getVehicles(@Query() paginationDto: VehiclePaginationDTO) {
    return this.vehicleService.getVehicles(paginationDto);
  }
}
