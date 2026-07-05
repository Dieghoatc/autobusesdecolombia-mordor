import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotographerDAO } from './dao/photograper.dao';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';

@Injectable()
export class PhotographerService {
  constructor(private readonly photographerDao: PhotographerDAO) {}

  create(createPhotographerDto: CreatePhotographerDto) {
    return this.photographerDao.create(createPhotographerDto);
  }

  findAll() {
    return this.photographerDao.findAll();
  }

  async findOne(id: number) {
    const photographer = await this.photographerDao.findOne(id);
    if (!photographer) {
      throw new NotFoundException(`Photographer #${id} not found`);
    }
    return photographer;
  }

  async update(id: number, updatePhotographerDto: UpdatePhotographerDto) {
    await this.findOne(id);
    return this.photographerDao.update(id, updatePhotographerDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.photographerDao.remove(id);
    return { message: `Photographer #${id} removed` };
  }
}
