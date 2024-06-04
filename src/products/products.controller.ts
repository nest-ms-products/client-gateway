import {
  Body,
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
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductMessages } from 'src/common/enums/messages-tcp.enum';
import { NatsService } from 'src/common/enums/services.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NatsService) private client: ClientProxy) {}
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send(ProductMessages.Create, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send(ProductMessages.FindAll, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(ProductMessages.FindOne, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(ProductMessages.Update, {
        id,
        updateProductDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(ProductMessages.Delete, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
