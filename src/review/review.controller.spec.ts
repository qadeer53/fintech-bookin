import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard';
import { BookingStatus } from 'src/booking/booking.entity';

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;

  // Mock data for User and Booking
  const userMock = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
  };
  const bookingMock = {
    id: 1,
    name: 'Booking 1',
    startDate: new Date(),
    endDate: new Date(),
    reviews: [],
    status: BookingStatus.PAID,
  };

  // Mock data for Review
  const reviewMock: Review = {
    id: 1,
    comment: 'Great experience!',
    rating: 5,
    user: userMock,
    booking: bookingMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Mocking the JwtAuthGuard
      .compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findUserReviews', () => {
    it('should return user reviews', async () => {
      jest
        .spyOn(reviewService, 'findUserReviews')
        .mockResolvedValue([reviewMock]);

      const req = { user: { id: userMock.id } };
      const result = await controller.findUserReviews(req);

      expect(result).toEqual([reviewMock]);
    });
  });

  describe('create', () => {
    it('should create a new review', async () => {
      jest.spyOn(reviewService, 'create').mockResolvedValue(reviewMock);

      const req = { user: { id: userMock.id } };
      const result = await controller.create(reviewMock, req);

      expect(result).toBe(reviewMock);
    });
  });
});
