import {
  OrderCoachListRdo,
  OrderCreate,
  OrderCreateMany,
  OrderCustomerListRdo,
  OrderDiaryPeriodRdo,
  OrderGetCoachList,
  OrderGetCustomerList,
  OrderGetDiary,
  OrderUpdateData,
} from '@fitfriends/contracts';
import { fillObject, OwnerGuard } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  public constructor(private readonly ordersService: OrdersService) { }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderCreate.topic,
    queue: OrderCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async create(dto: OrderCreate.Request): Promise<OrderCreate.Response> {
    const order = await this.ordersService.create(dto);
    return {statusCode: order};
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderCreateMany.topic,
    queue: OrderCreateMany.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createMany(
    dtos: OrderCreateMany.Request
  ): Promise<OrderCreateMany.Response> {
    const order = await this.ordersService.createMany(dtos);
    return {statusCode: order};
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderGetCoachList.topic,
    queue: OrderGetCoachList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getCoachList(
    query: OrderGetCoachList.Request
  ): Promise<OrderGetCoachList.Response> {
    const orders = await this.ordersService.getCoachList(query);
    return orders.map((order) => fillObject(OrderCoachListRdo, order));
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderGetCustomerList.topic,
    queue: OrderGetCustomerList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getCustomerList(
    query: OrderGetCustomerList.Request
  ): Promise<OrderGetCustomerList.Response> {
    const orders = await this.ordersService.getCustomerList(query);
    return orders.map((order) => fillObject(OrderCustomerListRdo, order));
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderGetDiary.topic,
    queue: OrderGetDiary.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getDiary(
    query: OrderGetDiary.Request
  ): Promise<OrderGetDiary.Response> {
    const diary = await this.ordersService.getDiary(query);
    return fillObject(OrderDiaryPeriodRdo, diary);
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderUpdateData.topic,
    queue: OrderUpdateData.queue,
    errorHandler: rmqErrorCallback,
  })
  @UseGuards(OwnerGuard)
  public async updateData(
    dto: OrderUpdateData.Request
  ): Promise<OrderUpdateData.Response> {
    const order = await this.ordersService.update(dto);
    return fillObject(OrderUpdateData.Response, order);
  }
}
