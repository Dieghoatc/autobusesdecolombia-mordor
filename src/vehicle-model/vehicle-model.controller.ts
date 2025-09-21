import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { ModelPaginationDTO } from './dto/model-pagination.dto';

@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}


  @Get()
  findAll() {
    return this.vehicleModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() paginationDto: ModelPaginationDTO) {
    return this.vehicleModelService.findOne(+id, paginationDto);
  }
}
