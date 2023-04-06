import { SortOrder } from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { DEFAULT_USERS_COUNT_LIMIT, DEFAULT_USERS_PAGINATION_COUNT, DEFAULT_USERS_SORT_ORDER } from '../user.constant';

export class UserFriendListQuery {
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_USERS_PAGINATION_COUNT
  )
  @IsOptional()
  public page?: number;

  @IsNumber()
  @Max(50)
  @Min(1)
  @Transform(({ value }) =>
    +value ? Math.abs(+value) : DEFAULT_USERS_COUNT_LIMIT
  )
  @IsOptional()
  public count?: number = DEFAULT_USERS_COUNT_LIMIT;

  @Transform(({ value }) => (value === SortOrder.Ascended ? 1 : -1))
  @IsIn([1, -1])
  @IsOptional()
  public sortCreation?: 1 | -1 = DEFAULT_USERS_SORT_ORDER;

  public userId?: string;
}
