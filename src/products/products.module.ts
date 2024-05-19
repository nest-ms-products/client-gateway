import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsService } from 'src/common/services.enum';
import { envs } from '../config/envs';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: ProductsService,
        transport: Transport.TCP,
        options: {
          host: envs.msProductsHost,
          port: envs.msProductsPort,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
