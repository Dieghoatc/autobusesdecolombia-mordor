import { Controller, Get, Param } from '@nestjs/common';
import { TransportCategoriesService } from './transport-category.service';

@Controller('transport-categories')
export class TransportCategoriesController {
  constructor(private readonly transportCategoriesService: TransportCategoriesService) {}

  @Get()
  findAll() {
    return this.transportCategoriesService.findAll();
  } 

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.transportCategoriesService.findBySlug(slug);
  }
}
