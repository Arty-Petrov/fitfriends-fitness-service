import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFriendsModel, UserFriendsSchema } from '../friends/user-friends.model';
import { UserModel, UserSchema } from './user.model';
import UserFriendsRepository from '../friends/user-friends.repository';
import UserRepository from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  controllers: [UserController],
  providers: [UserRepository, UserFriendsRepository, UserService],
  exports: [UserRepository],
})
export class UserModule { }
