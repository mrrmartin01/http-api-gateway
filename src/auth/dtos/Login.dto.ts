import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'No email was entered' })
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'No password was entered' })
  @ApiProperty({ example: 'strongPassword123' })
  password: string;
}
