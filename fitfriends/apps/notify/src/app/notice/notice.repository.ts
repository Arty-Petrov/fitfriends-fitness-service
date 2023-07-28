import { NoticeListQuery } from '@fitfriends/contracts';
import { CRUDRepository, Notice } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoticeEntity } from './notice.entity';
import { NoticeModel } from './notice.model';

@Injectable()
export class NoticeRepository
  implements CRUDRepository<NoticeEntity, string, Notice>
{
  constructor(
    @InjectModel(NoticeModel.name)
    private readonly noticeModel: Model<NoticeModel>
  ) {}

  public async create(item: NoticeEntity): Promise<Notice> {
    const newNotice = new this.noticeModel(item);
    return newNotice.save();
  }

  public async findById(id: string): Promise<Notice | null> {
    return this.noticeModel.findOne({ id }).exec();
  }

  public async find(query: NoticeListQuery): Promise<Notice[]> {
    const { recipientId, count, sort} = query;
    return this.noticeModel
      .find({
        recipientId: recipientId,
      })
      .sort({createdAt: sort})
      .limit(count)
      .exec();
  }

  public async update(id: string, item: NoticeEntity): Promise<Notice> {
    return this.noticeModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.noticeModel.deleteOne({ id });
  }
}
