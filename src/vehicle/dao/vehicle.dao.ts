import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class VehicleDAO {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  // Paso 1: obtener vehículos paginados sin relaciones
  async findAllPaginatedByIdTransportCategory(
    id: number,
    limit: number,
    offset: number,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle') // Alias para la consulta
      .where('vehicle.transport_category_id = :id', { id })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  // Paso 2: contar total de vehículos - CORREGIDO para usar la misma consulta
  async findCount(id: number): Promise<number> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.transport_category_id = :id', { id })
      .getCount();
  }

  // Paso 3: cargar relaciones por IDs - MÉTODO CORRECTO
  async findByIdsWithRelations(ids: number[]): Promise<Vehicle[]> {
    if (ids.length === 0) {
      return [];
    }

    // Usar QueryBuilder para mayor control y mantener el orden
    const vehicles = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.bodywork', 'bodywork')
      .leftJoinAndSelect('vehicle.chassis', 'chassis')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .where('vehicle.vehicle_id IN (:...ids)', { ids })
      .orderBy('vehicle.vehicle_id', 'DESC')
      // IMPORTANTE: También ordenar las fotos para consistencia
      .addOrderBy('vehiclePhotos.vehicle_photo_id', 'DESC')
      .getMany();

    // Mantener el orden original de los IDs para preservar la paginación
    const vehicleMap = new Map(vehicles.map(v => [v.vehicle_id, v]));
    return ids.map(id => vehicleMap.get(id)).filter(Boolean) as Vehicle[];
  }

  // MÉTODO ALTERNATIVO usando find() - por si prefieres esta aproximación
  async findByIdsWithRelationsAlternative(ids: number[]): Promise<Vehicle[]> {
    if (ids.length === 0) {
      return [];
    }
    
    const vehicles = await this.vehicleRepository.find({
      where: { vehicle_id: In(ids) },
      relations: {
        company: true,
        bodywork: true,
        chassis: true,
        vehiclePhotos: true,
      },
      order: {
        vehicle_id: 'DESC',
        vehiclePhotos: {
          vehicle_photo_id: 'DESC', // Ordenar también las fotos
        },
      },
    });

    // Reordenar según el array original de IDs
    const vehicleMap = new Map(vehicles.map(v => [v.vehicle_id, v]));
    return ids.map(id => vehicleMap.get(id)).filter(Boolean) as Vehicle[];
  }
}