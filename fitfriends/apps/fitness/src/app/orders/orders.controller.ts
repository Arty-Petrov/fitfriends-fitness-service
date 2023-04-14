import { OrderCreate, OrderCreateMany, OrderGetCoachList, OrderUpdateData } from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  public constructor(private readonly ordersService: OrdersService) { }

  @RMQValidate()
  @RMQRoute(OrderCreate.topic)
  public async create(dto: OrderCreate.Request): Promise<OrderCreate.Response> {
    const order = await this.ordersService.create(dto);
    return fillObject(OrderCreate.Response, order);
  }

  @RMQValidate()
  @RMQRoute(OrderCreateMany.topic)
  public async createMany(
    dtos: OrderCreateMany.Request
  ): Promise<OrderCreateMany.Response> {
    const orders = await this.ordersService.createMany(dtos);
    return fillObject(OrderCreateMany.Response, orders);
  }

  @RMQValidate()
  @RMQRoute(OrderGetCoachList.topic)
  public async getList(
    query: OrderGetCoachList.Request
  ): Promise<OrderGetCoachList.Response> {
    return this.ordersService.getCoachList(query);
  }

  @RMQValidate()
  @RMQRoute(OrderUpdateData.topic)
  public async updateData(
    dto: OrderUpdateData.Request
  ): Promise<OrderUpdateData.Response> {
    const order = await this.ordersService.update(dto);
    return fillObject(OrderUpdateData.Response, order);
  }
}
