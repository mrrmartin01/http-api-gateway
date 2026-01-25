import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/products')
export class ProductsController {
  constructor(@Inject('GATEWAY_SERVICE') private natsClient: ClientProxy) {}
  @Post()
  createProduct() {
    return { created: true };
  }
  @Get()
  getProducts() {
    return this.natsClient.send(
      { cmd: 'get_products' },
      { ' request': 'get all products' }
    );
  }
  getProductById() {
    return { product: {} };
  }
  editProduct() {
    return { edited: true };
  }
  deleteProduct() {
    return { deleted: true };
  }
}
