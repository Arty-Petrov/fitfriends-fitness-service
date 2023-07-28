import { WorkoutInvite } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutInviteEntity } from './workout-invite.entity';
import { WorkoutInviteModel } from './workout-invite.model';

@Injectable()
export class WorkoutInviteRepository {
  constructor(
    @InjectModel(WorkoutInviteModel.name) private readonly workoutInviteModel: Model<WorkoutInviteModel>
  ) { }

  public async create(entity: WorkoutInviteEntity): Promise<WorkoutInvite> {
    const newInvite = new this.workoutInviteModel(entity);
    return newInvite.save();
  }

  public async createMany(entities: WorkoutInviteEntity[]): Promise<WorkoutInvite[]> {
    return this.workoutInviteModel.insertMany(entities);
  }

  public async findInvitee(authorId: string): Promise<WorkoutInvite[]> {
    return this.workoutInviteModel.find({ authorId: authorId }).exec();
  }

  public checkExistEntry(authorId: string, inviteeId: string): Promise<WorkoutInvite | null> {
    return this.workoutInviteModel.findOne({
      authorId: authorId,
      inviteeId: inviteeId,
    }).exec();
  }

  public async update(_id: string, entity: WorkoutInviteEntity): Promise<WorkoutInvite> {
    return this.workoutInviteModel
      .findByIdAndUpdate(_id, entity.toObject(), { new: true })
      .exec();
  }

  public async destroy(_id: string): Promise<WorkoutInvite> {
    return this.workoutInviteModel
      .findByIdAndDelete(_id)
      .exec();
  }
}
