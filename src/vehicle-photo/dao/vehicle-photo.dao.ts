import { VehiclePhoto } from '../entities/vehicle-photo.entity';
import { PhotoFilterDto } from '../dto/photo-filter.dto';

export interface VehiclePhotoDAO {
  findAllFiltered(
    filters: PhotoFilterDto,
    limit: number,
    offset: number,
  ): Promise<[VehiclePhoto[], number]>;
  findById(id: number): Promise<VehiclePhoto | null>;
}
