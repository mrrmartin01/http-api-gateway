import {
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  Param,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    @Inject('GATEWAY_SERVICE') private readonly natsClient: ClientProxy
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a user' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.natsClient.send({ cmd: 'create_user' }, createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.natsClient.send({ cmd: 'login_user' }, loginUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getProfile(@CurrentUser() user: JwtUser) {
    return {
      status: 'success',
      code: 200,
      message: 'Profile retrieved successfully',
      user,
    };
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  refreshAccessToken(@CurrentUser() user: JwtUser) {
    return this.natsClient.send(
      { cmd: 'refresh_access_token' },
      {
        userId: user.id,
        refreshToken: user.jti,
      }
    );
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.natsClient.send(
      { cmd: 'update_user' },
      { id, ...updateUserDto }
    );
  }

  //ADMIN STUFF

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'List users' })
  // getUsers() {
  //   return this.natsClient.send({ cmd: 'get_users' }, {});
  // }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Get user by id' })
  // getUserById(@Param('id') id: string) {
  //   return this.natsClient.send({ cmd: 'get_user_by_id' }, { id });
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'Delete user' })
  // deleteUser(@Param('id') id: string) {
  //   return this.natsClient.send({ cmd: 'delete_user' }, { id });
  // }
}
