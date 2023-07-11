import { OrderStatusNotAllowed } from '@fitfriends/exceptions';
import { Entity, Order, OrderStatus, PaymentMethod, ProductType } from '@fitfriends/shared-types';
import { RpcException } from '@nestjs/microservices';

export class OrderEntity implements Entity<OrderEntity>, Order {
  id?: number;
  authorId: string;
  productType: ProductType;
  productId: number;
  productPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  statusFlow: OrderStatus[];

  constructor(entity: Order) {
    this.fillEntity(entity);
  }

  toObject(): OrderEntity {
    return { ...this };
  }

  updateStatus(newStatus: OrderStatus): OrderEntity {
    const statuses = Object.values(OrderStatus);
    let statusIndex = statuses.indexOf(this.status);
    const isInvalidStatus =
      this.status === OrderStatus.Finished ||
      this.status === OrderStatus.Expired ||
      newStatus !== statuses[++statusIndex];
    if (isInvalidStatus) {
      throw new RpcException(new OrderStatusNotAllowed(this.status, newStatus));
    }
    this.status = newStatus;
  return {...this};
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
