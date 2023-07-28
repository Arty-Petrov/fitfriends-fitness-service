import { NoticeDelete, NoticeDeleteDto, NoticeGetList, NoticeListQuery, NoticeListRdo } from '@fitfriends/contracts';
import { Exchanges } from '@fitfriends/rmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Delete, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAccessGuard } from '../guards/jwt-access.guard';

@ApiTags('notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly amqpConnection: AmqpConnection) { }

  @Get()
  @ApiResponse({
    type: NoticeListRdo,
    status: HttpStatus.OK,
    description: 'Notices are found',
  })
  @UseGuards(JwtAccessGuard)
  async getNoticeList(
    @UserData('sub') userId: string,
    @Query() query: NoticeListQuery,
  ): Promise<NoticeGetList.Response> {
    return await this.amqpConnection.request<NoticeGetList.Response>({
      exchange: Exchanges.notice.name,
      routingKey: NoticeGetList.topic,
      payload: { ...query, recipientId: userId },
    });
  }

  @Delete()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Notice is deleted',
  })
  @UseGuards(JwtAccessGuard)
  async deleteNotice(
    @UserData('sub') userId: string,
    @Body() dto: NoticeDeleteDto
  ): Promise<NoticeDelete.Response> {
    return await this.amqpConnection.request<NoticeDelete.Response>({
      exchange: Exchanges.notice.name,
      routingKey: NoticeDelete.topic,
      payload: { ...dto, recipientId: userId },
    });
  }
}
