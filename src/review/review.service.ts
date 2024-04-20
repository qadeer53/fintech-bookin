import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findUserReviews(id: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { user: { id: id } } });
  }

  async create(review: Review): Promise<Review> {
    return this.reviewRepository.save(review);
  }
}
