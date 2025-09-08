import { Injectable } from '@nestjs/common';
import { VehicleDAO } from './dao/vehicle.dao';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';
import { VehicleDTO } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    private readonly vehicleDao: VehicleDAO,
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

  async createVehicle(file: Express.Multer.File, vehicleDTO: VehicleDTO) {
    console.log(file);
    console.log(vehicleDTO);
    
    return "Perras"
  }
}

