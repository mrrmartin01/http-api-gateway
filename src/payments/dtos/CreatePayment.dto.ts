import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The amount to be paid', example: 100 })
  amount: number;
}
