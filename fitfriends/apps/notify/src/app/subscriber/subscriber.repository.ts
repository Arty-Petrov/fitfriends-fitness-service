import { CRUDRepository, Subscriber } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriberEntity } from './subscriber.entity';
import { SubscriberModel } from './subscriber.model';

@Injectable()
export class SubscriberRepository implements CRUDRepository<SubscriberEntity, string, Subscriber> {
  constructor(
    @InjectModel(SubscriberModel.name) private readonly subscriberModel: Model<SubscriberModel>
  ) { }

  public async create(item: SubscriberEntity): Promise<Subscriber> {
    const newSubscriber = new this.subscriberModel(item);
    return newSubscriber.save();
  }

  public async findById(id: string): Promise<Subscriber | null> {
    return this.subscriberModel
      .findOne({ id })
      .exec();
  }

  public async update(id: string, item: SubscriberEntity): Promise<Subscriber> {
    return this.subscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByPublisherId(publisherId: string): Promise<Subscriber[] | null> {
    return this.subscriberModel
      .find({ publisherId: publisherId })
      .exec()
  }

  public async findExist(publisherId: string, subscriberId: string): Promise<Subscriber> {
    return await this.subscriberModel
      .findOne({
        publisherId: publisherId,
        subscriberId: subscriberId,
      })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.subscriberModel.deleteOne({ id });
  }
}

