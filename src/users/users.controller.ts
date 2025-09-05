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

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser('id') userId: string) {
    return this.natsClient.send({ cmd: 'getMe' }, userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Edit user information' })
  @ApiBody({ type: EditUserDto, description: 'Data for edtting a user' })
  @ApiResponse({
    status: 201,
    description: 'The user info has been successfully editted.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Check your payload' })
  @UseGuards(JwtGuard)
  editUser(@GetUser('id') userId: string, @Body() editUserDto: EditUserDto) {
    console.log(editUserDto);
    return this.natsClient.send({ cmd: 'editUser' }, { userId, editUserDto });
  }
}
