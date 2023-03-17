import { UserListQuery } from '@fitfriends/contracts';
import { CRUDRepository, User } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export default class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) { }

  public async create(entity: UserEntity): Promise<User> {
    const newUser = new this.userModel(entity);
    return newUser.save();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel.findOne({ id }).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  public async find(query: UserListQuery): Promise<User[]> {
    const { sort, count } = query;
    return this.userModel.find().limit(count).sort({ createdAt: sort }).exec();
  }

  public async findAllSortedByRating(): Promise<User[]> {
    return this.userModel.find({}).select('rating').sort({ rating: -1 }).exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, item.toObject(), { new: true }).exec();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({ id });
  }
}
