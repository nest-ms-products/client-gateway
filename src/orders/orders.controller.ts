import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { OrdersService } from 'src/common/enums/services.enum';
import { OrdersMessages } from 'src/common/enums/messages-tcp.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(OrdersService) private readonly ordersClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  @Get()
  findAll() {
    return this.ordersClient.send(OrdersMessages.FindAll, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(OrdersMessages.FindOne, { id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return 'This action updates a #' + id + ' order';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'This action removes a #' + id + ' order';
  }
}
