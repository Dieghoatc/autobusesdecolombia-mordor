import { Photo } from '../entities/photos.entity';

export interface PhotoDAO {
  findAllPaginated(limit: number, offset: number): Promise<Photo[]>;
  findById(id: number): Promise<Photo | []>;
  findCount(): Promise<number>;
}
