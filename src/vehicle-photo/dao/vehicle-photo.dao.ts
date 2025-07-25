import { VehiclePhoto } from '../entities/vehicle-photo.entity';

export interface VehiclePhotoDAO {
  findAllPaginated(limit: number, offset: number): Promise<VehiclePhoto[]>;
  findById(id: number): Promise<VehiclePhoto | []>;
  findCount(): Promise<number>;
}
