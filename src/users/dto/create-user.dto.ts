import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "../enums/role.enum";

export class CreateUserDto {

    @ApiProperty({ example: 'usuario@example.com' })
    @IsEmail()
    @MaxLength(255)
    email: string;

    // bcrypt only uses the first 72 bytes of the password
    @ApiProperty({ example: 'S3gura#2026', minLength: 8 })
    @IsString()
    @MinLength(8)
    @MaxLength(72)
    password: string;

    @ApiPropertyOptional({ enum: Role, default: Role.Editor })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
