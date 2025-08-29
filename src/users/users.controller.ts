import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto, description: 'Data for creating a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Check your payload' })
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.natsClient.send({ cmd: 'createUser' }, createUserDto);
  }
}
