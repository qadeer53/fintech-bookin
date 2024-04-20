import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { User } from 'src/user/user.entity';
import { Booking } from 'src/booking/booking.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, User, Booking]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
