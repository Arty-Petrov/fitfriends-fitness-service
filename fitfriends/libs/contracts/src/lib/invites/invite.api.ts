import { Invite, InviteStatus, SortOrder } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { DEFAULT_INVITE_COUNT_LIMIT, DEFAULT_INVITE_PAGINATION_COUNT, DEFAULT_INVITE_SORT_ORDER, InviteApiDescription, InviteApiError } from './invite.constant';

export class InviteApi implements Invite {
  @ApiProperty({
    required: true,
    description: InviteApiDescription.Id,
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({
    required: true,
    description: InviteApiDescription.CustomerId,
  })
  @IsMongoId()
  public customerId: string;

  @ApiProperty({
    required: true,
    description: InviteApiDescription.RecipientId,
  })
  @IsMongoId()
  public recipientId: string;

  @ApiProperty({
    required: true,
    description: InviteApiDescription.CreatedAt,
  })
  public createdAt: Date;

  @ApiProperty({
    required: true,
    description: InviteApiDescription.UpdatedAt,
  })
  public updatedAt: Date;

  @ApiProperty({
    required: true,
    description: InviteApiDescription.Status,
  })
  @IsEnum(InviteStatus, {
    message: InviteApiError.StatusIsNotValid,
  })
  public status: InviteStatus;

  @ApiProperty({
    required: false,
  })
  @IsEnum(SortOrder)
  public sort: SortOrder = DEFAULT_INVITE_SORT_ORDER;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  public page: number = DEFAULT_INVITE_PAGINATION_COUNT;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Transform(({ value }) => {
    return value < DEFAULT_INVITE_COUNT_LIMIT ? value : DEFAULT_INVITE_COUNT_LIMIT;
  })
  public count: number = DEFAULT_INVITE_COUNT_LIMIT;
}
