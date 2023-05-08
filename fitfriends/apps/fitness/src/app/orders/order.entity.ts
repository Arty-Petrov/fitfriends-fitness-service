import { Entity, Order, OrderStatus, PaymentMethod, ProductType } from '@fitfriends/shared-types';

export class OrderEntity implements Entity<OrderEntity>, Order {
  id?: number;
  authorId: string;
  productType: ProductType;
  productId: number;
  productPrice: number;
  status: OrderStatus;
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
    this.productId = entity.productId;
    this.productPrice = entity.productPrice;
    this.status = entity.status?? OrderStatus.Purchased;
    this.paymentMethod = entity.paymentMethod;
    this.createdAt = entity?.createdAt;
  }
}
