import {
  SortOrder,
  SubwayStation,
  TrainingType,
  UserExperience,
  UserRole,
} from '@fitfriends/shared-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_USERS_COUNT_LIMIT,
  DEFAULT_USERS_PAGINATION_COUNT,
  DEFAULT_USERS_SORT_ORDER,
} from '../user.constant';

export class UserListQuery {
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

  @Transform(({ value }) => (value === UserRole.Coach ? 1 : -1))
  @IsIn([1, -1])
  @IsOptional()
  public sortRole?: 1 | -1 = DEFAULT_USERS_SORT_ORDER;

  @Transform(({ value }) => (value === SortOrder.Ascended ? 1 : -1))
  @IsIn([1, -1])
  @IsOptional()
  public sortCreation?: 1 | -1 = DEFAULT_USERS_SORT_ORDER;

  @IsEnum(SubwayStation, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public locations?: SubwayStation[];

  @IsEnum(TrainingType, {
    each: true,
  })
  @Transform(({ value }) => value.split(',').map((item: string) => item))
  @IsOptional()
  public trainings?: TrainingType[];

  @IsEnum(UserExperience)
  @IsOptional()
  public experience?: UserExperience;
}
