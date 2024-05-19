import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  create() {
    return 'create a product';
  }

  @Get()
  findAll() {
    return 'get all products';
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
