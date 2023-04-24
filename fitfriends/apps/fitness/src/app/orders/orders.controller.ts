import { OrderCreate, OrderCreateMany, OrderGetCoachList, OrderUpdateData } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
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
    return fillObject(OrderCreate.Response, order);
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
    const orders = await this.ordersService.createMany(dtos);
    return fillObject(OrderCreateMany.Response, orders);
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderGetCoachList.topic,
    queue: OrderGetCoachList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getList(
    query: OrderGetCoachList.Request
  ): Promise<OrderGetCoachList.Response> {
    return this.ordersService.getCoachList(query);
  }

  @RabbitRPC({
    exchange: Exchanges.orders.name,
    routingKey: OrderUpdateData.topic,
    queue: OrderUpdateData.queue,
    errorHandler: rmqErrorCallback,
  })
  public async updateData(
    dto: OrderUpdateData.Request
  ): Promise<OrderUpdateData.Response> {
    const order = await this.ordersService.update(dto);
    return fillObject(OrderUpdateData.Response, order);
  }
}
