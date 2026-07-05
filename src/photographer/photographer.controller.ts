import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('photographers')
@Controller('photographer')
export class PhotographerController {
  constructor(private readonly photographerService: PhotographerService) {}

  @ApiOperation({ summary: 'Crea un fotógrafo' })
  @Post()
  create(@Body() createPhotographerDto: CreatePhotographerDto) {
    return this.photographerService.create(createPhotographerDto);
  }

  @ApiOperation({ summary: 'Lista todos los fotógrafos' })
  @Get()
  findAll() {
    return this.photographerService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un fotógrafo por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Fotógrafo no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photographerService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza un fotógrafo' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Fotógrafo no encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotographerDto: UpdatePhotographerDto) {
    return this.photographerService.update(+id, updatePhotographerDto);
  }

  @ApiOperation({ summary: 'Elimina un fotógrafo' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Fotógrafo no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographerService.remove(+id);
  }
}
