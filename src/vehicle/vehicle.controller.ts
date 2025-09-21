import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VehicleDTO } from './dto/vehicle.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly redisService: RedisService,
  ) {}

  @Get(':id') getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(+id);
  }

  @Get('category/:id') async getVehiclesByCategory(
    @Param('id') id: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    const cacheKey = `vehicles_by_category_${id}_${paginationDto.page}_${paginationDto.limit}`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.vehicleService.getVehiclesByCategory(
      +id,
      paginationDto,
    );
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
  }

  @Get()
  async getVehicles(@Query() paginationDto: VehiclePaginationDTO) {
    const cacheKey = `vehicles_${paginationDto.page}_${paginationDto.limit}`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.vehicleService.getVehicles(paginationDto);
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
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
  async createVehicle(
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
    await this.redisService.delCacheByPattern(
      `vehicles_by_category_${VehiclePaginationDTO}_*`
    );

    return this.vehicleService.createVehicle(file, vehicleDTO);
  }
}
