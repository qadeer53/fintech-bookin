import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
