import { Notice, NoticeCategory, SortOrder, UserGender } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import {
  DEFAULT_NOTICE_COUNT_LIMIT,
  DEFAULT_NOTICE_PAGINATION_COUNT,
  DEFAULT_NOTICE_SORT_ORDER,
  NoticeApiDescription,
  NoticeApiError,
} from './notice.constant';

export class NoticeApi implements Notice {
  @ApiProperty({
    required: true,
    description: NoticeApiDescription.Id,
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({
    required: true,
    description: NoticeApiDescription.SenderId,
  })
  @IsMongoId()
  public senderId: string;

  @ApiProperty({
    required: true,
    description: NoticeApiDescription.SenderName,
  })
  @IsMongoId()
  public senderName: string;

  @ApiProperty({
    required: true,
    description: NoticeApiDescription.SenderGenger,
  })
  @IsEnum(UserGender, {
    message: NoticeApiError.SenderGenderIsWrong,
  })
  public senderGender: UserGender;

  @ApiProperty({
    required: true,
    description: NoticeApiDescription.RecepientId,
  })
  @IsMongoId()
  public recipientId: string;

  @ApiProperty({
    required: false,
  })
  @IsEnum(NoticeCategory, {
    message: NoticeApiError.CategoryIsWrong,
  })
  public category: NoticeCategory;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_NOTICE_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_NOTICE_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_NOTICE_COUNT_LIMIT ? value : DEFAULT_NOTICE_COUNT_LIMIT;
  })
  public count: number = DEFAULT_NOTICE_COUNT_LIMIT;
}
