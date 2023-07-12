import {
  OrderCoachListQuery,
  OrderCoachListRdo,
  OrderCreateDto,
  OrderCustomerListQuery,
  OrderCustomerListRdo,
  OrderDiaryQuery,
  OrderUpdateDataDto,
} from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { AuthorizeOwner, DiaryPeriod, Order, ProductType } from '@fitfriends/shared-types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GymsRepository } from '../gyms/gyms.repository';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { OrderEntity } from './order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService implements AuthorizeOwner {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly trainingsRepository: TrainingsRepository,
    private readonly gymsRepository: GymsRepository,
  ) { }

  public async create(dto: OrderCreateDto): Promise<HttpStatus> {
    const { productType, productId, amount } = dto;
    const existProduct = (productType === ProductType.Training)
    ? await this.trainingsRepository.findById(productId)
    : await this.gymsRepository.findById(productId);
    if (!existProduct) {
      throw new RpcException(new ItemNotFoundException(productType, productId));
    }
    const orderEntities = Array(amount).fill(new OrderEntity(dto));
    const orders = await this.ordersRepository.createMany(orderEntities);
    return (orders) ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public async createMany(dtos: OrderCreateDto[]): Promise<HttpStatus> {
    const orderEntities = dtos.map(
      (dto) => Array(dto.amount)
        .fill(new OrderEntity(dto)))
      .flat();
    const orders = await this.ordersRepository.createMany(orderEntities);
    return (orders) ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public async getById(id: number): Promise<Order> {
    const existOrder = await this.ordersRepository.findById(id);
    if (!existOrder) {
      throw new ItemNotFoundException('Order', id);
    }
    return existOrder;
  }

  public async getCoachList(
    query: OrderCoachListQuery
  ): Promise<OrderCoachListRdo[]> {
    return this.ordersRepository.findCoachOrders(query);
  }

  public async getCustomerList(
    query: OrderCustomerListQuery
  ): Promise<OrderCustomerListRdo[]> {
    return this.ordersRepository.findCustomerOrders(query);
  }

  public async getDiary(
    query: OrderDiaryQuery
  ): Promise<DiaryPeriod> {
    const diaryDays = await this.ordersRepository.getDiaryDays(query);
    const periodCalories = diaryDays.reduce((total, day) => total + day.dayCaloriesLoss, 0);
    return {
      periodData: diaryDays,
      periodCaloriesLoss: periodCalories,
    }
  }

  public async update(dto: OrderUpdateDataDto): Promise<Order> {
    const { id, authorId, status } = dto;
    this.markExpiredOrders(authorId);
    const existOrder = await this.getById(id);
    const orderEntity = new OrderEntity({ ...existOrder });
    orderEntity.updateStatus(status);
    return this.ordersRepository.update(id, orderEntity);
  }

  public async isOwner(
    currentUserId: string,
    objectId: number
  ): Promise<boolean> {
    const { authorId } = await this.getById(objectId);
    return currentUserId === authorId;
  }

  private async markExpiredOrders(customerId: string): Promise<void> {
    await this.ordersRepository.markExpiredOrders(customerId);
  }
}
