import { Entity, Order, PaymentMethod, ProductType } from '@fitfriends/shared-types';

export class OrderEntity implements Entity<OrderEntity>, Order {
  id?: number;
  authorId: string;
  productType: ProductType;
  productId: number;
  productPrice: number;
  quantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  createdAt: Date;

  constructor(entity: Order) {
    this.fillEntity(entity);
  }

  toObject(): OrderEntity {
    return { ...this };
  }

  fillEntity(entity: Order) {
  this.id = entity?.id;
  this.authorId = entity.authorId;
  this.productType = entity.productType;
  this.productPrice= entity.productPrice;
  this.productId = entity.productId;
  this.quantity = entity.quantity;
  this.totalPrice = entity.productPrice * entity.quantity;
  this.paymentMethod = entity.paymentMethod;
  this.createdAt = entity.createdAt;
  }
}
