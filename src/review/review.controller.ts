import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async findUserReviews(@Request() req): Promise<Review[]> {
    const userId = req.user.id;
    return this.reviewService.findUserReviews(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() review: Review, @Request() req): Promise<Review> {
    const userId = req.user.id;
    return this.reviewService.create({ ...review, user: userId });
  }
}
