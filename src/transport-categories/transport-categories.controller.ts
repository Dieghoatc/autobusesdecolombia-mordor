import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportCategoriesService } from './transport-categories.service';
import { CreateTransportCategoryDto } from './dto/create-transport-category.dto';
import { UpdateTransportCategoryDto } from './dto/update-transport-category.dto';

@Controller('transport-categories')
export class TransportCategoriesController {
  constructor(private readonly transportCategoriesService: TransportCategoriesService) {}

  @Post()
  create(@Body() createTransportCategoryDto: CreateTransportCategoryDto) {
    return this.transportCategoriesService.create(createTransportCategoryDto);
  }

  @Get()
  findAll() {
    return this.transportCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportCategoryDto: UpdateTransportCategoryDto) {
    return this.transportCategoriesService.update(+id, updateTransportCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportCategoriesService.remove(+id);
  }
}
