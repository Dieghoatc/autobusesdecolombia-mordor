import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { ModelPaginationDTO } from './dto/model-pagination.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('vehicle-models')
@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @ApiOperation({ summary: 'Lista todos los modelos de vehículo' })
  @Get()
  findAll() {
    return this.vehicleModelService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un modelo de vehículo por ID' })
  @ApiParam({ name: 'id', example: 5 })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() paginationDto: ModelPaginationDTO) {
    return this.vehicleModelService.findOne(+id, paginationDto);
  }
}
