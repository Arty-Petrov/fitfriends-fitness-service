import { OrderSortType, ProductType, SortOrder } from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import {
  DEFAULT_ORDERS_COUNT_LIMIT,
  DEFAULT_ORDERS_PAGINATION_COUNT,
  DEFAULT_ORDERS_SORT_ORDER,
  DEFAULT_ORDERS_SORT_TYPE,
} from './order.constant';

export class OrderQueryApi {
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_ORDERS_PAGINATION_COUNT
  )
  @IsOptional()
  public page?: number;

  @IsNumber()
  @Max(DEFAULT_ORDERS_COUNT_LIMIT)
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_ORDERS_COUNT_LIMIT
  )
  @IsOptional()
  public count?: number = DEFAULT_ORDERS_COUNT_LIMIT;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortCreation?: SortOrder = DEFAULT_ORDERS_SORT_ORDER;

  @IsEnum(OrderSortType)
  @IsOptional()
  public sortType?: OrderSortType = DEFAULT_ORDERS_SORT_TYPE;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = DEFAULT_ORDERS_SORT_ORDER;

  @IsEnum(ProductType)
  @IsOptional()
  public type?: ProductType;

  @IsOptional()
  public coachId: string;
}
