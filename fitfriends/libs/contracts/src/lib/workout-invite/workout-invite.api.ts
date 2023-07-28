import { WorkoutInvite, WorkoutInviteStatus } from '@fitfriends/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { WorkoutInviteApiDescription, WorkoutInviteApiError } from './workout-invite.constant';

export class WorkoutInviteApi implements WorkoutInvite {
  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.Id,
  })
  @IsMongoId()
  public id: string;

  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.AuthorId,
  })
  @IsMongoId()
  public authorId: string;

  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.InviteeId,
  })
  @IsMongoId()
  public inviteeId: string;

  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.Status,
  })
  @IsEnum(WorkoutInviteStatus, {
    message: WorkoutInviteApiError.StatusIsNotValid,
  })
  public status: WorkoutInviteStatus;

  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.CreatedAt,
  })
  public createdAt: Date;

  @ApiProperty({
    required: true,
    description: WorkoutInviteApiDescription.UpdatedAt,
  })
  public updatedAt: Date;
}
