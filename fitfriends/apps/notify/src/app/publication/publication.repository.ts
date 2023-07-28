import { PublicationListQuery } from '@fitfriends/contracts';
import { CRUDRepository, Publication } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublicationEntity } from './publication.entity';
import { PublicationModel } from './publication.model';

@Injectable()
export class PublicationRepository
  implements CRUDRepository<PublicationEntity, string, Publication>
{
  constructor(
    @InjectModel(PublicationModel.name)
    private readonly publicationModel: Model<PublicationModel>
  ) {}

  public async create(item: PublicationEntity): Promise<Publication> {
    const newPublication = new this.publicationModel(item);
    return newPublication.save();
  }

  public async find(
    query: PublicationListQuery
  ): Promise<Publication[] | null> {
    const { authorId, category } = query;
    return this.publicationModel
      .find({
        authorId: authorId,
        category: category,
      })
      .exec();
  }

  public async findById(id: string): Promise<Publication | null> {
    return this.publicationModel.findOne({ id }).exec();
  }

  public async update(
    id: string,
    item: PublicationEntity
  ): Promise<Publication> {
    return this.publicationModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findExist(
    publisherId: string,
    subscriberId: string,
    entityId: number
  ): Promise<Publication> {
    return await this.publicationModel
      .findOne({
        publisherId: publisherId,
        subscriberId: subscriberId,
        entityId: entityId,
      })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    await this.publicationModel.deleteOne({ id });
  }

  public async destroyByIds(ids: string[]): Promise<void> {
    await this.publicationModel.deleteMany({ id: { in: ids } }).exec();
  }
}
