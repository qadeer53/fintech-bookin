import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({ relations: ['reviews'] });
  }

  async findOne(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({
      where: { id: id },
      relations: ['reviews'],
    });
  }
}
