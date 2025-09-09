import { Controller, Get, Param, Query, Post, UseInterceptors, UploadedFile, Body, ValidationPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VehicleDTO } from './dto/vehicle.dto';


@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get(':id') getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(+id);
  }

  @Get('category/:id') getVehiclesByCategory(
    @Param('id') id: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesByCategory(+id, paginationDto);
  }

  @Get() getVehicles(@Query() paginationDto: VehiclePaginationDTO) {
    return this.vehicleService.getVehicles(paginationDto);
  }

  @Get('plate/:plate') getVehiclesByPlate(
    @Param('plate') plate: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesByPlate(plate, paginationDto);
  }

  @Get('serial/:serial') getVehiclesBySerial(
    @Param('serial') serial: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesBySerial(serial, paginationDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))

  createVehicle(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) vehicleDTO: VehicleDTO,
  ) {

    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      throw new Error('El archivo es demasiado grande.');
    }

    return this.vehicleService.createVehicle(file, vehicleDTO);
  }
}
