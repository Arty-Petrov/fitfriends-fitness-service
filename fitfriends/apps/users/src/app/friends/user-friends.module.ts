import { RmqModule } from '@fitfriends/rmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserFriendsRepository from '../friends/user-friends.repository';
import { UserModel, UserSchema } from '../user/user.model';
import UserRepository from '../user/user.repository';
import { WorkoutInviteModel, WorkoutInviteSchema } from '../workout-invite/workout-invite.model';
import { WorkoutInviteRepository } from '../workout-invite/workout-invite.repository';
import { UserFriendsController } from './user-friends.controller';
import { UserFriendsModel, UserFriendsSchema } from './user-friends.model';
import { UserFriendsService } from './user-friends.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
      {
        name: UserFriendsModel.name,
        schema: UserFriendsSchema,
      },
      {
        name: WorkoutInviteModel.name,
        schema: WorkoutInviteSchema,
      },
    ]),
    RmqModule,
  ],
  controllers: [UserFriendsController],
  providers: [
    UserRepository,
    WorkoutInviteRepository,
    UserFriendsRepository,
    UserFriendsService,
  ],
  exports: [],
})
export class UserFriendsModule {}
