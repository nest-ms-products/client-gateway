import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrdersMessages } from 'src/common/enums/messages-tcp.enum';
import { OrdersService } from 'src/common/enums/services.enum';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(OrdersService) private readonly ordersClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send(OrdersMessages.Create, createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.ordersClient.send(OrdersMessages.FindAll, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send(OrdersMessages.FindOne, { id });
  }
}
