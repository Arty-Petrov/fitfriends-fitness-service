import { OrderCoachListRdo, OrderCreateDto, OrderUpdateDataDto } from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { AuthorizeOwner, Order, OrderQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from './order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService implements AuthorizeOwner {
  constructor(private readonly ordersRepository: OrdersRepository) { }

  public async create(dto: OrderCreateDto): Promise<Order> {
    const orderEntity = new OrderEntity(dto);
    return this.ordersRepository.create(orderEntity);
  }

  public async createMany(dtos: OrderCreateDto[]): Promise<Order[]> {
    const orders = dtos.map((dto) => new OrderEntity(dto));
    return this.ordersRepository.createMany(orders);
  }

  public async getById(id: number): Promise<Order> {
    const existOrder = await this.ordersRepository.findById(id);
    if (!existOrder) {
      throw new ItemNotFoundException('Order', id);
    }
    return existOrder;
  }

  public async getCoachList(query: OrderQuery): Promise<OrderCoachListRdo[]> {
    return this.ordersRepository.findCoachOrders(query);
  }

  public async update(dto: OrderUpdateDataDto): Promise<Order> {
    const { id } = dto;
    const existOrder = await this.getById(id);
    const orderEntity = new OrderEntity({ ...existOrder, ...dto });
    return this.ordersRepository.update(id, orderEntity);
  }

  public async isOwner(
    currentUserId: string,
    objectId: number
  ): Promise<boolean> {
    const { authorId } = await this.getById(objectId);
    return currentUserId === authorId;
  }
}
