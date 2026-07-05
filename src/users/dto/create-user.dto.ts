import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ example: 'usuario@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'S3gura#2026', minLength: 6 })
    @IsString()
    password: string;
}
