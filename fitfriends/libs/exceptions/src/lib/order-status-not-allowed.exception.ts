import { OrderStatus } from '@fitfriends/shared-types';
import { BadRequestException } from '@nestjs/common';

export class OrderStatusNotAllowed extends BadRequestException {
  constructor(currentStatus: OrderStatus, newStatus: OrderStatus) {
    super(`Order status change from ${currentStatus} to ${newStatus} is nor allowed`);
  }
}
