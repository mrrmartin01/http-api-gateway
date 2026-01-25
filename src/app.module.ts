import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ClientsModule } from '@nestjs/microservices';
import { NATS_CLIENT_CONFIG } from './config/nats-client.config';

@Module({
  imports: [
    ClientsModule.register([NATS_CLIENT_CONFIG]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
