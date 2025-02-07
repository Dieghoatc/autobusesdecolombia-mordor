import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    subject: string; 

    @IsString()
    @IsNotEmpty()
    message: string;
}
