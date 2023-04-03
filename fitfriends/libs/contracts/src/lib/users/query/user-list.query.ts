import {
  SortOrder,
  SubwayStation,
  TrainingType,
  UserExperience,
  UserRole,
} from '@fitfriends/shared-types';
import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  Max,
  Min,
  IsOptional,
  IsIn,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { UserApi } from '../user.api';
import {
  DEFAULT_USERS_COUNT_LIMIT,
  DEFAULT_USERS_PAGINATION_COUNT,
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

  @IsIn([1, -1])
  @Transform(({ value }) => (value === UserRole.Coach ? 1 : -1))
  @IsOptional()
  public sort?: 1 | -1 = SortOrder.Descended;

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
  public tranings?: TrainingType[];

  @IsEnum(UserExperience)
  @IsOptional()
  public experience?: UserExperience;
}
