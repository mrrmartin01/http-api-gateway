import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'John' })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiProperty({ example: 'John Doe' })
  displayName?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'strongPassword123' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user' })
  role?: string;
}
