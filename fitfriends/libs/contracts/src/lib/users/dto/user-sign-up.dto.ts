import { SubwayStation, TrainingDuration, UserGender, UserRole } from '@fitfriends/shared-types';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { UserApi } from '../user.api';

export class UserSignUpDto extends PickType(UserApi, [
  'name',
  'email',
  'avatar',
  'password',
  'gender',
  'dateBirth',
  'role',
  'location',
  'experience',
  'trainingTypes',
  'trainingDuration',
  'caloriesLoss',
  'caloriesConsumption',
  'isReadyForInvite',
  'certificate',
  'awards',
  'isPersonalCoach',
]) {
  public name: string;

  public email: string;

  public avatar: string;

  public password: string;

  public gender: UserGender;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public dateBirth?: Date;

  public role: UserRole;

  public location: SubwayStation;

  @ValidateIf((user) => user.role === UserRole.Customer)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Customer ?  value : undefined
  )
  public trainingDuration: TrainingDuration;

  @ValidateIf((user) => user.role === UserRole.Customer)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Customer ?  value : undefined
  )
  public caloriesLoss: number;

  @ValidateIf((user) => user.role === UserRole.Customer)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Customer ?  value : undefined
  )
  public caloriesConsumption: number;

  @ValidateIf((user) => user.role === UserRole.Customer)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Customer ?  value : undefined
  )
  public isReadyForInvite: boolean;

  @ValidateIf((user) => user.role === UserRole.Coach)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Coach ?  value : undefined
  )
  public certificate: string;

  @ValidateIf((user) => user.role === UserRole.Coach)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Coach ?  value : undefined
  )
  public awards: string;

  @ValidateIf((user) => user.role === UserRole.Coach)
  @Transform(({ obj, value }) =>
    obj.role === UserRole.Coach ?  value : undefined
  )
  public isPersonalCoach: boolean;
}
