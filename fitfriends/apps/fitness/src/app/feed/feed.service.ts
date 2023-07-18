import { FeedBalanceQuery, FeedCreateDto, FeedDiaryQuery, FeedUpdateDataDto } from '@fitfriends/contracts';
import { ItemExistsException, ItemNotFoundException } from '@fitfriends/exceptions';
import { AuthorizeOwner, Feed, FeedBalanceDay, FeedDiaryPeriod } from '@fitfriends/shared-types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FeedEntity } from './feed.entity';
import { FeedRepository } from './feed.repository';

@Injectable()
export class FeedService implements AuthorizeOwner {
  constructor(
    private readonly feedRepository: FeedRepository,
  ) { }

  public async create(
    dto: FeedCreateDto
  ): Promise<FeedDiaryPeriod> {
    const { date, mealOrdinal, authorId } = dto;
    const existFeed = await this.feedRepository
      .checkExistEntry(date, mealOrdinal, authorId);
    if (existFeed) {
      throw new ItemExistsException('feed', dto);
    }
    const feedEntity = new FeedEntity(dto);
    await this.feedRepository.create(feedEntity);
    return this.getFeedDiary({ authorId });
  }

  public async createMany(
    dtos: FeedCreateDto[]
  ): Promise<HttpStatus> {
    const feedEntries = dtos.map((dto) => new FeedEntity(dto));
    const feeds = await this.feedRepository.createMany(feedEntries);
    return (feeds) ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  public async getById(
    id: number
  ): Promise<Feed> {
    const existFeed = await this.feedRepository.findById(id);
    if (!existFeed) {
      throw new ItemNotFoundException('Feed', id);
    }
    return existFeed;
  }

  public async getFeedBalance(
    query: FeedBalanceQuery
  ): Promise<FeedBalanceDay[]> {
    const feedBalance = await this.feedRepository.getFeedBalance(query);
    console.log(feedBalance);
    return feedBalance;
  }

  public async getFeedDiary(
    query: FeedDiaryQuery
  ): Promise<FeedDiaryPeriod> {
    const feedDiary = await this.feedRepository.getFeedDiary(query);
    const periodCalories = feedDiary.reduce((total, day) => total + day.dayCaloriesGain, 0);
    return {
      periodData: feedDiary,
      periodCaloriesGain: periodCalories,
    }

  }

  public async update(
    dto: FeedUpdateDataDto
  ): Promise<FeedDiaryPeriod> {
    const { id, authorId } = dto;
    const existFeed = await this.getById(id);
    const feedEntity = new FeedEntity({ ...existFeed });
    feedEntity.updateData(dto);
    await this.feedRepository.update(id, feedEntity);
    return this.getFeedDiary({ authorId });
  }

  public async isOwner(
    currentUserId: string,
    objectId: string | number
  ): Promise<boolean> {
    const { authorId } = await this.getById(objectId as number);
    return currentUserId === authorId;
  }
}
