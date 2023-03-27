import { PaymentMethod, ProductType, Purchase, SortOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import {
  DEFAULT_PURCHASE_COUNT_LIMIT,
  DEFAULT_PURCHASE_PAGINATION_COUNT,
  DEFAULT_PURCHASE_SORT_ORDER,
  PurchaseApiDescription,
  PurchaseApiError,
  PurchaseQuantityRange,
} from './purchase.constant';

export class PurchaseApi implements Purchase {
  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.Id,
  })
  @IsNumber()
  public id: string;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.CustomerId,
  })
  @IsMongoId()
  public customerId: string;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.ProductType,
  })
  @IsEnum(ProductType, {
    message: PurchaseApiError.ProductTypeIsNotValide,
  })
  public productType: ProductType;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.ProductId,
  })
  @IsNumber()
  public productId: number;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.ProductPrice,
  })
  @IsNumber()
  public productPrice: number;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.Quantity,
  })
  @IsNumber()
  @Min(PurchaseQuantityRange.Min)
  @Max(PurchaseQuantityRange.Max)
  public quantity: number;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.TotalPrice,
  })
  @IsNumber()
  public totalPrice?: number;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.PaymentMethod,
  })
  @IsEnum(PaymentMethod, {
    message: PurchaseApiError.PaymentMethodIsNotValide,
  })
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    required: true,
    description: PurchaseApiDescription.CreatedAt,
  })
  public createdAt?: Date;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_PURCHASE_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_PURCHASE_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_PURCHASE_COUNT_LIMIT ? value : DEFAULT_PURCHASE_COUNT_LIMIT;
  })
  public count: number = DEFAULT_PURCHASE_COUNT_LIMIT;
}
