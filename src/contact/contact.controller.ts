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
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Send a message from the contact form' })
  @ApiCreatedResponse({ description: 'Contact created successfully' })
  @ApiInternalServerErrorResponse({ description: 'Error creating the contact' })
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      const createdContact = await this.contactService.create(createContactDto);
      return {
        statusCode: HttpStatus.CREATED, // Use HttpStatus for status codes
        data: createdContact,
      };
    } catch (error) {
      throw new HttpException(
        'Error creating the contact',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
