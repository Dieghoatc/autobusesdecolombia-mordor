import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty({ example: 'juan.perez@example.com', description: 'Email of the person contacting us' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Consulta sobre flota', description: 'Message subject' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ example: 'Quisiera más información sobre...', description: 'Message content' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
