import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dtos/Login.dto';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dtos/Register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto, description: 'Data for logging in a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Check your payload' })
  async login(@Body() dto: LoginDto): Promise<any> {
    const user = lastValueFrom(this.natsClient.send('loginUser', dto));
    return user;
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterDto,
    description: 'Data for registering a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Check your payload' })
  async register(@Body() dto: RegisterDto): Promise<any> {
    const user = lastValueFrom(this.natsClient.send('registerUser', dto));
    return user;
  }
}
