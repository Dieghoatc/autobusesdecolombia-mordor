import { PartialType } from '@nestjs/mapped-types';
import { CreateTransportCategoryDto } from './create-transport-category.dto';

export class UpdateTransportCategoryDto extends PartialType(CreateTransportCategoryDto) {}
