import { IsEnum, IsOptional } from 'class-validator';
import { OrdersStatus, OrdersStatusList } from '../enum/order-status.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Status must be one of the following values: ${OrdersStatusList}`,
  })
  status: OrdersStatus;
}
