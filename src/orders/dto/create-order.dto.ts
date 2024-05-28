import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrdersStatus, OrdersStatusList } from '../enum/order-status.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrdersStatusList, {
    message: `Status must be one of the following values: ${OrdersStatusList}`,
  })
  @IsOptional()
  status: OrdersStatus = OrdersStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  paid: boolean = false;
}
