import { Order, PaymentMethod, ProductType } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { OrderApiDescription, OrderApiError, OrderQuantityRange } from './order.constant';

export class OrderApi implements Order {
  @ApiProperty({
    required: true,
    description: OrderApiDescription.Id,
  })
  @IsNumber()
  public id: number;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.AuthorId,
  })
  @IsMongoId()
  public authorId: string;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.ProductType,
  })
  @IsEnum(ProductType, {
    message: OrderApiError.ProductTypeIsNotValid,
  })
  public productType: ProductType;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.ProductId,
  })
  @IsNumber()
  public productId: number;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.ProductPrice,
  })
  @IsNumber()
  public productPrice: number;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.Quantity,
  })
  @IsNumber()
  @Min(OrderQuantityRange.Min)
  @Max(OrderQuantityRange.Max)
  public quantity: number;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.TotalPrice,
  })
  @IsNumber()
  public totalPrice?: number;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.PaymentMethod,
  })
  @IsEnum(PaymentMethod, {
    message: OrderApiError.PaymentMethodIsNotValid,
  })
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.CreatedAt,
  })
  public createdAt?: Date;
}