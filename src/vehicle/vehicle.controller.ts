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
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('vehicles')
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly redisService: RedisService,
  ) {}

  @ApiOperation({ summary: 'Obtiene un vehículo por ID' })
  @ApiParam({ name: 'id', example: 101 })
  @Get(':id') getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(+id);
  }

  @ApiOperation({ summary: 'Lista vehículos por categoría de transporte (con caché en Redis)' })
  @ApiParam({ name: 'id', example: 1, description: 'ID de la categoría de transporte' })
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

  @ApiOperation({ summary: 'Lista vehículos paginados' })
  @Get()
  async getVehicles(@Query() paginationDto: VehiclePaginationDTO) {
    return await this.vehicleService.getVehicles(paginationDto);
  }

  @ApiOperation({ summary: 'Busca vehículos por placa' })
  @ApiParam({ name: 'plate', example: 'ABC123' })
  @Get('plate/:plate') getVehiclesByPlate(
    @Param('plate') plate: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesByPlate(plate, paginationDto);
  }

  @ApiOperation({ summary: 'Busca vehículos por serial de empresa' })
  @ApiParam({ name: 'serial', example: 'INT-4521' })
  @Get('serial/:serial') getVehiclesBySerial(
    @Param('serial') serial: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesBySerial(serial, paginationDto);
  }

  @ApiOperation({ summary: 'Crea un vehículo con su foto principal' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: { type: 'string', format: 'binary' },
        vehicle_type_id: { type: 'number' },
        model_id: { type: 'number' },
        company_id: { type: 'number' },
        transport_category_id: { type: 'number' },
        company_serial: { type: 'string' },
        company_service_id: { type: 'number' },
        plate: { type: 'string' },
        photographer_id: { type: 'number' },
        location: { type: 'string' },
      },
      required: ['location'],
    },
  })
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
      `vehicles_${VehiclePaginationDTO}_*`
    );
    await this.redisService.delCacheByPattern(
      `vehicles_by_category_${vehicleDTO.transport_category_id}_${VehiclePaginationDTO}_*`
    );

    return this.vehicleService.createVehicle(file, vehicleDTO);
  }
}
