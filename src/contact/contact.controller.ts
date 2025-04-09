import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const createdContact = await this.contactService.create(createContactDto);
      return {
        statusCode: HttpStatus.CREATED, // Usa HttpStatus para códigos de estado
        data: createdContact,
      };
    } catch (error) {
      throw new HttpException(
        'Error al crear el contacto',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
