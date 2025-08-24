import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiProperty({ example: 'John Doe' })
  displayName?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@mail.com' })
  email: string;
}
