import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
    @ApiProperty({ example: 'juan.perez@example.com', description: 'Correo de quien contacta' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Consulta sobre flota', description: 'Asunto del mensaje' })
    @IsString()
    @IsNotEmpty()
    subject: string;

    @ApiProperty({ example: 'Quisiera más información sobre...', description: 'Contenido del mensaje' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
