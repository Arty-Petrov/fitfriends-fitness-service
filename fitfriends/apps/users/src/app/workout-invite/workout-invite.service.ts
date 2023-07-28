import { NoticeCreate, WorkoutInviteAnswerDto, WorkoutInviteSendDto } from '@fitfriends/contracts';
import { ItemExistsException, ItemNotExistsException, WorkoutInviteForbiddenException } from '@fitfriends/exceptions';
import { Exchanges } from '@fitfriends/rmq';
import { NoticeCategory, WorkoutInvite, WorkoutInviteStatus } from '@fitfriends/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { HttpStatus, Injectable, NotImplementedException } from '@nestjs/common';
import UserRepository from '../user/user.repository';
import { WorkoutInviteEntity } from './workout-invite.entity';
import { WorkoutInviteRepository } from './workout-invite.repository';

@Injectable()
export class WorkoutInviteService {
  constructor(
    private readonly workoutInviteRepository: WorkoutInviteRepository,
    private readonly userRepository: UserRepository,
    private readonly amqpConnection: AmqpConnection
  ) {}

  public async createMany(): Promise<void> {
    throw new NotImplementedException();
  }

  public async create(dto: WorkoutInviteSendDto): Promise<WorkoutInvite> {
    const { authorId, inviteeId } = dto;
    const existWorkoutInvite =
      await this.workoutInviteRepository.checkExistEntry(authorId, inviteeId);
    if (existWorkoutInvite) {
      throw new ItemExistsException('Invite', dto);
    }
    const {
      isReadyForInvite = true,
      isPersonalCoach = true,
      email,
    } = await this.userRepository.findById(inviteeId);
    if (!isReadyForInvite || !isPersonalCoach) {
      throw new WorkoutInviteForbiddenException(email);
    }
    const workoutInviteEntity = new WorkoutInviteEntity(dto);
    const workoutInvite = await this.workoutInviteRepository.create(
      workoutInviteEntity
    );
    const { name: authorName, gender: authorGender } =
      await this.userRepository.findById(authorId);
    await this.amqpConnection.publish(
      Exchanges.notice.name,
      NoticeCreate.topic,
      {
        senderId: authorId,
        senderName: authorName,
        senderGender: authorGender,
        recipientId: inviteeId,
        category: NoticeCategory.WorkoutInviteRecieved,
      }
    );
    return workoutInvite;
  }

  public async update(dto: WorkoutInviteAnswerDto): Promise<WorkoutInvite> {
    const { authorId, inviteeId } = dto;
    const existWorkoutInvite =
      await this.workoutInviteRepository.checkExistEntry(authorId, inviteeId);
    if (!existWorkoutInvite) {
      throw new ItemNotExistsException('Invite', authorId);
    }
    const workoutInviteEntity = new WorkoutInviteEntity(existWorkoutInvite);
    workoutInviteEntity.updateData(dto);
    const { id } = existWorkoutInvite;
    const workoutInvite = await this.workoutInviteRepository.update(
      id,
      workoutInviteEntity
    );
    const { name: inviteeName, gender: inviteeGender } =
      await this.userRepository.findById(inviteeId);
    const noticeCategory =
      workoutInvite.status === WorkoutInviteStatus.Accepted
        ? NoticeCategory.WorkoutInviteAccepted
        : NoticeCategory.WorkoutInviteRejected;
    await this.amqpConnection.publish(
      Exchanges.notice.name,
      NoticeCreate.topic,
      {
        senderId: inviteeId,
        senderName: inviteeName,
        senderGender: inviteeGender,
        recipientId: authorId,
        category: noticeCategory,
      }
    );
    return workoutInvite;
  }

  public async destroy(id: string): Promise<void | HttpStatus.ACCEPTED> {
    await this.workoutInviteRepository.destroy(id);
    return HttpStatus.ACCEPTED;
  }
}
