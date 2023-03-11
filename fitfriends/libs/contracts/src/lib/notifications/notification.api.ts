import { Notification, SortOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, IsString, Length } from 'class-validator';
import {
  DEFAULT_NOTIFICATION_COUNT_LIMIT,
  DEFAULT_NOTIFICATION_PAGINATION_COUNT,
  DEFAULT_NOTIFICATION_SORT_ORDER,
  NotificationApiDescription,
  NotificationApiError,
  NotificationTextLength,
} from './notification.constant';

export class NotificationApi implements Notification {
  @ApiProperty({
    required: true,
    description: NotificationApiDescription.Id,
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({
    required: true,
    description: NotificationApiDescription.UserId,
  })
  @IsMongoId()
  public userId: string;

  @ApiProperty({
    required: true,
    description: NotificationApiDescription.Text,
  })
  @IsString()
  @Length(NotificationTextLength.Min, NotificationTextLength.Max, {
    message: NotificationApiError.TextIsNotValid,
  })
  public text: string;

  @ApiProperty({
    required: true,
    description: NotificationApiDescription.CreatedAt,
  })
  public createdAt: Date;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_NOTIFICATION_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_NOTIFICATION_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_NOTIFICATION_COUNT_LIMIT ? value : DEFAULT_NOTIFICATION_COUNT_LIMIT;
  })
  public count: number = DEFAULT_NOTIFICATION_COUNT_LIMIT;
}
