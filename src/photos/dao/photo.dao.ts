import { Photo2 } from '../entities/photos.entitie';

export interface PhotoDAO {
  findAllPaginated(limit: number, offset: number): Promise<Photo2[]>;
  findById(id: number): Promise<Photo2 | []>;
  findCount(): Promise<number>;
}
