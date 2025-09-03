import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dtos/EditUser.dto';
import { GetUser } from 'src/auth/decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get('me')
  getMe(@GetUser() user: any) {
    return this.natsClient.send({ cmd: 'getMe' }, user);
  }

  @Patch()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: EditUserDto, description: 'Data for creating a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Check your payload' })
  @UseGuards(JwtGuard)
  editUser(@GetUser('id') userId: string, @Body() editUserDto: EditUserDto) {
    console.log(editUserDto);
    return this.natsClient.send({ cmd: 'editUser' }, [userId, editUserDto]);
  }
}
