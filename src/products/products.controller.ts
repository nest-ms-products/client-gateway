import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductMessages } from 'src/common/enums/messages-tcp.enum';
import { ProductsService } from 'src/common/enums/services.enum';

@Controller('products')
export class ProductsController {
  constructor(@Inject(ProductsService) private productsClient: ClientProxy) {}
  @Post()
  create() {
    return 'create a product';
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(ProductMessages.FindAll, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send(ProductMessages.FindOne, { id });
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
