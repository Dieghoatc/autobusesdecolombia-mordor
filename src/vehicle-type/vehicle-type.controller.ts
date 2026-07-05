import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { ApiTags, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('vehicle-types')
@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @ApiOperation({ summary: 'Crea un tipo de vehículo' })
  @Post()
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @ApiOperation({ summary: 'Lista todos los tipos de vehículo' })
  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un tipo de vehículo por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Tipo de vehículo no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza un tipo de vehículo' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Tipo de vehículo no encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(+id, updateVehicleTypeDto);
  }

  @ApiOperation({ summary: 'Elimina un tipo de vehículo' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Tipo de vehículo no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleTypeService.remove(+id);
  }
}
