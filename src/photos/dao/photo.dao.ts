import { Photo2 } from '../entities/photos.entity';

export interface PhotoDAO {
  findAllPaginated(limit: number, offset: number): Promise<Photo2[]>;
  findById(id: number): Promise<Photo2 | []>;
  findCount(): Promise<number>;
}
