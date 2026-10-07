import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { ModelPaginationDTO } from './dto/model-pagination.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('vehicle-models')
@Controller('vehicle-model')
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @ApiOperation({ summary: 'List all vehicle models' })
  @Get()
  findAll() {
    return this.vehicleModelService.findAll();
  }

  @ApiOperation({ summary: 'Get a vehicle model by ID' })
  @ApiParam({ name: 'id', example: 5 })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() paginationDto: ModelPaginationDTO) {
    return this.vehicleModelService.findOne(+id, paginationDto);
  }
}
