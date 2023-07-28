import {
  NoticeCreate,
  NoticeCreateDto,
  NoticeDelete,
  NoticeDeleteDto,
  NoticeGetList,
  NoticeListQuery,
  NoticeListRdo,
} from '@fitfriends/contracts';
import { fillObject } from '@fitfriends/core';
import { rmqErrorCallback } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, HttpStatus } from '@nestjs/common';
import { NoticeService } from './notice.service';

@Controller()
export class NoticeController {
  constructor(
    private readonly noticeService: NoticeService,
  ) {}

  @RabbitRPC({
    exchange: Exchanges.notice.name,
    routingKey: NoticeCreate.topic,
    queue: NoticeCreate.queue,
    errorHandler: rmqErrorCallback,
  })
  public async createNotice(dto: NoticeCreateDto): Promise<void> {
    await this.noticeService.create(dto);
  }

  @RabbitRPC({
    exchange: Exchanges.notice.name,
    routingKey: NoticeGetList.topic,
    queue: NoticeGetList.queue,
    errorHandler: rmqErrorCallback,
  })
  public async getNoticeList(query: NoticeListQuery): Promise<NoticeGetList.Response> {
    const notices = await this.noticeService.getList(query);
    return fillObject(NoticeListRdo, notices);
  }

  @RabbitRPC({
    exchange: Exchanges.notice.name,
    routingKey: NoticeDelete.topic,
    queue: NoticeDelete.queue,
    errorHandler: rmqErrorCallback,
  })
  public async deleteNotice(dto: NoticeDeleteDto): Promise<HttpStatus> {
    await this.noticeService.delete(dto);
    return HttpStatus.OK;
  }
}
