import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.findOne(id);
  }
}
