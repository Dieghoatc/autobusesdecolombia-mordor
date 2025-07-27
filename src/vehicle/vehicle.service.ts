import { Injectable, Logger } from '@nestjs/common';
import { VehicleDAO } from './dao/vehicle.dao';
import { VehiclePaginationDTO } from './dto/vehicle-pagination.dto';

@Injectable()
export class VehicleService {
  constructor(private readonly vehicleDao: VehicleDAO) {}

  async getVehicleById(id: number, paginationDto: VehiclePaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const [vehicles, totalCount] = await Promise.all([
      this.vehicleDao.findAllPaginatedByIdTransportCategory(id, limit, offset),
      this.vehicleDao.findCount(id),
    ]);

    // const vehicleIds = vehicles.map((v) => v.vehicle_id);
    // const vehiclesWithRelations =
    //   await this.vehicleDao.findByIdsWithRelations(vehicleIds);

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
}
