import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsService } from 'src/common/enums/services.enum';
import { envs } from '../config/envs';
import { ProductsController } from './products.controller';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: NatsService,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
