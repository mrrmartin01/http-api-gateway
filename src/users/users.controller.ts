import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TUserDto, TUserResponseDto } from './types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('GATEWAY_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @Post()
  createUser(@Body() userDto: TUserDto) {
    return this.natsClient.send<TUserResponseDto, TUserDto>(
      { cmd: 'create_user' },
      userDto
    );
  }

  @Get()
  getUsers() {}

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return { message: id };
  }

  @Patch('/:id')
  editUser(@Param('id') id: string) {
    return { message: id };
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return { message: id };
  }
}
