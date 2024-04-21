import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingStatus } from './booking.entity';
import { JwtAuthGuard } from 'src/auth/auth-guard';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  // Define mock data
  const bookings: Booking[] = [
    {
      id: 1,
      name: 'Booking 1',
      startDate: new Date(),
      endDate: new Date(),
      reviews: [],
      status: BookingStatus.PAID,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [BookingService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Mocking the JwtAuthGuard
      .compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of bookings', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(bookings);

      expect(await controller.findAll()).toBe(bookings);
    });
  });

  describe('findOne', () => {
    it('should return a single booking', async () => {
      const bookingId = 1;
      const booking: Booking = bookings[0]; // Use the first booking from the mock data
      jest.spyOn(service, 'findOne').mockResolvedValue(booking);

      expect(await controller.findOne(bookingId)).toBe(booking);
    });
  });

  describe('pay', () => {
    it('should pay for the booking', async () => {
      const bookingId = 1;
      const booking: Booking = bookings[0]; // Use the first booking from the mock data
      jest.spyOn(service, 'pay').mockResolvedValue(booking);

      expect(await controller.pay(bookingId)).toBe(booking);
    });
  });
});
