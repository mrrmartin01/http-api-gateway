import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Unique email address of the user',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    minLength: 8,
    format: 'password',
    example: 'StrongP@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'Optional physical address of the user',
    example: '123 Main St, New York, NY',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
