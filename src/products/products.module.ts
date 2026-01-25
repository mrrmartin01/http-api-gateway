import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule } from '@nestjs/microservices';
import { NATS_CLIENT_CONFIG } from '../config/nats-client.config';

@Module({
  imports: [ClientsModule.register([NATS_CLIENT_CONFIG])],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
