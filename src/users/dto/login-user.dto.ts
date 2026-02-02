import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 8 characters)',
    minLength: 8,
    format: 'password',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  @MinLength(8)
  password: string;
}
