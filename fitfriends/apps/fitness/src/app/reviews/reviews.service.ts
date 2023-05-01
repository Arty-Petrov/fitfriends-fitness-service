import { ReviewCreateDto, ReviewListQuery } from '@fitfriends/contracts';
import { ItemNotFoundException } from '@fitfriends/exceptions';
import { Review } from '@fitfriends/shared-types';
import { Injectable } from '@nestjs/common';
import { TrainingsRepository } from '../trainings/trainings.repository';
import { ReviewEntity } from './review.entity';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly trainingsRepository: TrainingsRepository,
  ) { }

  public async create(dto: ReviewCreateDto): Promise<Review> {
    const { trainingId } = dto;
    const reviewEntity = new ReviewEntity(dto); 
    const review = await this.reviewsRepository.create(reviewEntity);
    const trainingRating = await this.reviewsRepository.getTrainingRating(trainingId);
    await this.trainingsRepository.updateRating(trainingId, trainingRating);
    return review;
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

  public async getList(query: ReviewListQuery): Promise<Review[]> {
    return this.reviewsRepository.find(query);
  }
}
