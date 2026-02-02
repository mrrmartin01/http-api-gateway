import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NATS_CLIENT_CONFIG } from '../config/nats-client.config';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ClientsModule.register([NATS_CLIENT_CONFIG]), AuthModule],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
