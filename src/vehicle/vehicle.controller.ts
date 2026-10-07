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
  BadRequestException,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { VehicleDTO } from './dto/vehicle.dto';
import { RedisService } from 'src/redis/redis.service';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AdminOnly } from '../auth/decorators/auth.decorator';

@ApiTags('vehicles')
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly redisService: RedisService,
  ) {}

  @ApiOperation({ summary: 'Get a vehicle by ID' })
  @ApiParam({ name: 'id', example: 101 })
  @Get(':id') getVehicleById(@Param('id') id: string) {
    return this.vehicleService.getVehicleById(+id);
  }

  @ApiOperation({ summary: 'List vehicles by transport category (cached in Redis)' })
  @ApiParam({ name: 'id', example: 1, description: 'Transport category ID' })
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

  @ApiOperation({ summary: 'List paginated vehicles' })
  @Get()
  async getVehicles(@Query() paginationDto: VehiclePaginationDTO) {
    return await this.vehicleService.getVehicles(paginationDto);
  }

  @ApiOperation({ summary: 'Search vehicles by plate' })
  @ApiParam({ name: 'plate', example: 'ABC123' })
  @Get('plate/:plate') getVehiclesByPlate(
    @Param('plate') plate: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesByPlate(plate, paginationDto);
  }

  @ApiOperation({ summary: 'Search vehicles by company serial' })
  @ApiParam({ name: 'serial', example: 'INT-4521' })
  @Get('serial/:serial') getVehiclesBySerial(
    @Param('serial') serial: string,
    @Query() paginationDto: VehiclePaginationDTO,
  ) {
    return this.vehicleService.getVehiclesBySerial(serial, paginationDto);
  }

  @ApiOperation({
    summary: 'Publish a vehicle photo',
    description:
      'With vehicle_id, adds the photo to that vehicle. Without it, creates a new vehicle ' +
      '(vehicle_type_id, model_id, company_id and transport_category_id are required).',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: { type: 'string', format: 'binary' },
        vehicle_id: { type: 'number' },
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
      required: ['photo', 'photographer_id', 'location'],
    },
  })
  @AdminOnly()
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createVehicle(
    @UploadedFile() file: Express.Multer.File,
    @Body(ValidationPipe) vehicleDTO: VehicleDTO,
  ) {
    if (!file) {
      throw new BadRequestException('No file was received');
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file.size > maxSize) {
      throw new BadRequestException('The file is too large (max 5MB)');
    }

    const result = await this.vehicleService.createVehicle(file, vehicleDTO);

    // Category listings are cached as vehicles_by_category_{id}_{page}_{limit}
    await this.redisService.delCacheByPattern('vehicles_by_category_*');

    return result;
  }
}
