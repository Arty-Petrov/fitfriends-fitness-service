import { UserListQuery } from '@fitfriends/contracts';
import { CRUDRepository, User } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export default class UserRepository
  implements CRUDRepository<UserEntity, string, User>
{
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) { }

  public async create(entity: UserEntity): Promise<User> {
    const newUser = new this.userModel(entity);
    return newUser.save();
  }

  public async createMany(entities: UserEntity[]): Promise<User[]> {
   return this.userModel.insertMany(entities);
  }

  public async findById(_id: string): Promise<User | null> {
    return this.userModel.findOne({ _id }).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async find(query: UserListQuery): Promise<User[]> {
    const {
      locations,
      trainings,
      experience,
      sortRole,
      sortCreation,
      count,
      page,
    } = query;
    return this.userModel.aggregate([
      locations || trainings || experience
        ? {
          $match: {
            location: locations ? { $in: locations } : { $ne: {} },
            trainingTypes: trainings ? { $in: trainings } : { $ne: {} },
            experience: experience || { $ne: {} },
          },
        }
        : { $addFields: {} },
      { $skip: page > 0 ? count * (page - 1) : 0 },
      { $limit: count },
      { $sort: { createdAt: sortCreation } },
      { $sort: { role: sortRole } },
      { $addFields: { id: { $toString: '$_id' } } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0, password: 0, _id: 0 } },
    ]);
  }

  public async update(_id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(_id, item.toObject(), { new: true })
      .exec();
  }

  public async destroy(_id: string): Promise<void> {
    this.userModel.deleteOne({ _id });
  }
}
