import { UserFriendListQuery } from '@fitfriends/contracts';
import { UserFriends } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFriendsEntity } from './user-friends.entity';
import { UserFriendsModel } from './user-friends.model';

@Injectable()
export default class UserFriendsRepository {
  constructor(
    @InjectModel(UserFriendsModel.name)
    private readonly userFriendsModel: Model<UserFriendsModel>
  ) {}

  public async create(entity: UserFriendsEntity): Promise<UserFriends> {
    const newFriend = new this.userFriendsModel(entity);
    return newFriend.save();
  }

  public async createMany(
    entities: UserFriendsEntity[]
  ): Promise<UserFriends[]> {
    return this.userFriendsModel.insertMany(entities);
  }

  public async findByUserId(userId: string): Promise<UserFriends | null> {
    return this.userFriendsModel.findOne({ userId: userId }).exec();
  }

  public async findFriends(query: UserFriendListQuery) {
    const {
      userId,
      sortCreation,
      count,
      page,
    } = query;
    return this.userFriendsModel.aggregate([
      { $match: { userId: userId } },
      {
        $addFields: {
          userIds: { $map: { input: "$friendIds", in: { $toObjectId: "$$this" } } }
        }
      },
      {
        $lookup:
          {
            from: 'users',
            localField: 'userIds',
            foreignField: '_id',
            as: 'friends'
          }
      },
      { $unwind: "$friends" },
      { $replaceRoot: { newRoot: "$friends" }},
      { $skip: page > 0 ? count * (page - 1) : 0 },
      { $limit: count },
      { $sort: { createdAt: sortCreation } },
      { $addFields: { id: { $toString: '$_id' } } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0, password: 0, _id: 0 } }
    ]);
  }

  public async update(
    _id: string,
    entity: UserFriendsEntity
  ): Promise<UserFriends> {
    return this.userFriendsModel
      .findByIdAndUpdate(_id, entity.toObject(), { new: true })
      .exec();
  }

  public async destroy(_id: string): Promise<UserFriends> {
    return this.userFriendsModel.findByIdAndDelete(_id).exec();
  }
}
