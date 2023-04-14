import { ReviewCreateDto } from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Review, ReviewQuery } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
  ) { }

  public async create(dto: ReviewCreateDto): Promise<Review> {
    const reviewEntity = new ReviewEntity(dto);
    return this.reviewsRepository.create(reviewEntity);
  }

  public async createMany(dtos: ReviewCreateDto[]): Promise<Review[]> {
    const reviews = dtos.map((dto) => new ReviewEntity(dto));
    return this.reviewsRepository.createMany(reviews);
  }

  public async getById(id: number): Promise<Review> {
    const existReview = await this.reviewsRepository.findById(id);
    if (!existReview) {
      throw new ItemNotFoundException('Review', id);
    }
    return existReview;
  }

  public async getList(dto: ReviewQuery): Promise<Review[]> {
    return this.reviewsRepository.find(dto);
  }
}
