import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {

    @ApiProperty({ example: 'usuario@example.com' })
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty({ example: 'S3gura#2026' })
    @IsString()
    @MinLength(1)
    @MaxLength(72)
    password: string;
}
