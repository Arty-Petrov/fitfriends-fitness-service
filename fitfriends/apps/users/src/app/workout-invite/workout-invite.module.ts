import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '../user/user.model';
import UserRepository from '../user/user.repository';
import { WorkoutInviteController } from './workout-invite.controller';
import { WorkoutInviteModel, WorkoutInviteSchema } from './workout-invite.model';
import { WorkoutInviteRepository } from './workout-invite.repository';
import { WorkoutInviteService } from './workout-invite.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
      {
        name: WorkoutInviteModel.name,
        schema: WorkoutInviteSchema,
      },
    ]),
    RmqModule,
  ],
  controllers: [WorkoutInviteController],
  providers: [WorkoutInviteService, WorkoutInviteRepository, UserRepository],
  exports: [],
})
export class WorkoutInviteModule { }
