import { Order, OrderStatus, PaymentMethod, ProductType } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber, Max, Min } from 'class-validator';
import { OrderAmountRange, OrderApiDescription, OrderApiError } from './order.constant';

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
    description: OrderApiDescription.Status,
  })
  @IsEnum(OrderStatus, {
    message: OrderApiError.OrderStatusIsNotValid,
  })
  public status?: OrderStatus;

  @ApiProperty({
    required: true,
    description: OrderApiDescription.Amount,
  })
  @IsNumber()
  @Min(OrderAmountRange.Min)
  @Max(OrderAmountRange.Max)
  public amount: number;

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
