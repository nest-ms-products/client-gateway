import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from 'src/common/enums/services.enum';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: OrdersService,
        transport: Transport.TCP,
        options: {
          host: envs.msOrdersHost,
          port: envs.msOrdersPort,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
