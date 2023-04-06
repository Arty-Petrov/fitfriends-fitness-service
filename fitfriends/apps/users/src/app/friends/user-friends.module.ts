import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserFriendsRepository from '../friends/user-friends.repository';
import { UserModel, UserSchema } from '../user/user.model';
import UserRepository from '../user/user.repository';
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
    ]),
  ],
  controllers: [UserFriendsController],
  providers: [UserRepository, UserFriendsRepository, UserFriendsService],
  exports: [],
})
export class UserFriendsModule { }
