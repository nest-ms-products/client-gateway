import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductsService } from 'src/common/services.enum';

@Controller('products')
export class ProductsController {
  constructor(@Inject(ProductsService) private productsClient: ClientProxy) {}
  @Post()
  create() {
    return 'create a product';
  }

  @Get()
  findAll() {
    return this.productsClient.send('FIND_ALL_PRODUCTS', {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return 'get one product by id' + id;
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number) {
    return 'update a product by id' + id;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return 'delete a product by id' + id;
  }
}
