import { Injectable } from '@nestjs/common';
import { PhotographerDAO } from './dao/photograper.dao';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';

@Injectable()
export class PhotographerService {
  constructor(private readonly photographerDao: PhotographerDAO) {}
  
  create(createPhotographerDto: CreatePhotographerDto) {
    return 'This action adds a new photographer';
  }

  findAll() {
    return this.photographerDao.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} photographer`;
  }

  update(id: number, updatePhotographerDto: UpdatePhotographerDto) {
    return `This action updates a #${id} photographer`;
  }

  remove(id: number) {
    return `This action removes a #${id} photographer`;
  }
}
