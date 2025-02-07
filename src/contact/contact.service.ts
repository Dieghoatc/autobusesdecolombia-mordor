import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async create(createContactDto: CreateContactDto) {
    try {
      const name = 'diego';
      const email = 'marketing@autobusesdecolombia.com';
      const { error } = await this.resend.emails.send({
        from: `${name} <${email}>`,
        to: [`${email}`],
        subject: `${createContactDto.subject}`,
        html: `<p>Mensaje recibido de autobusesdecolombia.com</p>
        <p>De: ${createContactDto.email}</p><p>${createContactDto.message}</p>`,
      });
      if (error) {
        return console.error({ error });
      }
      return {
        statusCode: 201,
        data: createContactDto,
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: error,
      };
    }
  }
}
