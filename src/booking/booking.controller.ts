import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<Booking[]> {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.findOne(id);
  }

  @Post('pay/:id')
  @UseGuards(JwtAuthGuard)
  async pay(@Param('id') id: number): Promise<Booking> {
    return this.bookingService.pay(id);
  }
}
