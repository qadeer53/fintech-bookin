import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['reviews', 'reviews.user'],
    });
  }

  async findOne(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id: id },
      relations: ['reviews', 'reviews.user'],
    });
  }

  async pay(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = BookingStatus.PAID;
    return this.bookingRepository.save(booking);
  }
}
