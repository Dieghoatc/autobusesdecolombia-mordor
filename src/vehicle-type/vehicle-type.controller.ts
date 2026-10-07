import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { ApiTags, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { AdminOnly } from '../auth/decorators/auth.decorator';

@ApiTags('vehicle-types')
@Controller('vehicle-type')
export class VehicleTypeController {
  constructor(private readonly vehicleTypeService: VehicleTypeService) {}

  @ApiOperation({ summary: 'Create a vehicle type' })
  @AdminOnly()
  @Post()
  create(@Body() createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeService.create(createVehicleTypeDto);
  }

  @ApiOperation({ summary: 'List all vehicle types' })
  @Get()
  findAll() {
    return this.vehicleTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get a vehicle type by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Vehicle type not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a vehicle type' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Vehicle type not found' })
  @AdminOnly()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    return this.vehicleTypeService.update(+id, updateVehicleTypeDto);
  }

  @ApiOperation({ summary: 'Delete a vehicle type' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Vehicle type not found' })
  @AdminOnly()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleTypeService.remove(+id);
  }
}
