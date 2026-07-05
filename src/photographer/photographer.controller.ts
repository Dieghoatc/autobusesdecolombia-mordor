import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';
import { ApiTags, ApiOperation, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('photographers')
@Controller('photographer')
export class PhotographerController {
  constructor(private readonly photographerService: PhotographerService) {}

  @ApiOperation({ summary: 'Create a photographer' })
  @Post()
  create(@Body() createPhotographerDto: CreatePhotographerDto) {
    return this.photographerService.create(createPhotographerDto);
  }

  @ApiOperation({ summary: 'List all photographers' })
  @Get()
  findAll() {
    return this.photographerService.findAll();
  }

  @ApiOperation({ summary: 'Get a photographer by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Photographer not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photographerService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a photographer' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Photographer not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotographerDto: UpdatePhotographerDto) {
    return this.photographerService.update(+id, updatePhotographerDto);
  }

  @ApiOperation({ summary: 'Delete a photographer' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiNotFoundResponse({ description: 'Photographer not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographerService.remove(+id);
  }
}
