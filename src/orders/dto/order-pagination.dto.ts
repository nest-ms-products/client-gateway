import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { OrdersStatus, OrdersStatusList } from '../enum/order-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrdersStatusList, {
    message: `Status must be one of the following values: ${OrdersStatusList}`,
  })
  status: OrdersStatus;
}
