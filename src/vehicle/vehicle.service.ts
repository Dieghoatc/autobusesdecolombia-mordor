import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleDAO } from './dao/vehicle.dao';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';
import { VehicleDTO } from './dto/vehicle.dto';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';

// Required when the photo creates a new vehicle instead of using vehicle_id
const REQUIRED_NEW_VEHICLE_FIELDS = [
  'vehicle_type_id',
  'model_id',
  'company_id',
  'transport_category_id',
] as const;

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleDao: VehicleDAO,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getVehicleById(id: number) {
    return this.vehicleDao.findVehicleByID(id);
  }

  async getVehiclesByCategory(id: number, paginationDto: VehiclePaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const [vehicles, totalCount] = await Promise.all([
      this.vehicleDao.findAllPaginatedByIdTransportCategory(id, limit, offset),
      this.vehicleDao.findCountByID(id),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/vehicle/${id}?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/vehicle/${id}?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: vehicles,
    };
  }

  async getVehicles(paginationDto: VehiclePaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const [vehicles, totalCount] = await Promise.all([
      this.vehicleDao.findAll(limit, offset),
      this.vehicleDao.findCount(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    console.log('📡 Consultando base de datos...');

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/vehicle?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/vehicle?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: vehicles,
    };
  }

  async getVehiclesByPlate(plate: string, paginationDto: VehiclePaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const [vehicles, totalCount] = await Promise.all([
      this.vehicleDao.findVehicleForPlate(plate, limit, offset),
      this.vehicleDao.findCount(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/vehicle?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/vehicle?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: vehicles,
    };
  }

  async getVehiclesBySerial(serial: string, paginationDto: VehiclePaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const [vehicles, totalCount] = await Promise.all([
      this.vehicleDao.findVehicleForSerial(serial, limit, offset),
      this.vehicleDao.findCount(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/vehicle?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/vehicle?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: vehicles,
    };
  }

  // Everything is validated before uploading, so rejected requests leave no
  // orphan images in Cloudinary.
  async createVehicle(file: Express.Multer.File, vehicleDTO: VehicleDTO) {
    const vehicleId = vehicleDTO.vehicle_id;

    if (vehicleId) {
      if (!(await this.vehicleDao.existsById(vehicleId))) {
        throw new NotFoundException(`Vehicle ${vehicleId} not found`);
      }
    } else {
      const missing = REQUIRED_NEW_VEHICLE_FIELDS.filter(
        (field) => vehicleDTO[field] == null,
      );
      if (missing.length) {
        throw new BadRequestException(
          `Missing fields for a new vehicle: ${missing.join(', ')}`,
        );
      }
    }

    const imageUrl = await this.cloudinaryService.uploadImage('autobusesdecolombia', file.buffer);

    if (vehicleId) {
      await this.vehicleDao.addPhoto(vehicleId, imageUrl, vehicleDTO);
      return { message: 'Photo added to vehicle', vehicle_id: vehicleId };
    }

    const newVehicleId = await this.vehicleDao.createVehicle(imageUrl, vehicleDTO);
    return { message: 'Vehicle created successfully', vehicle_id: newVehicleId };
  }
}

