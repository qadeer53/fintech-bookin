import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum BookingStatus {
  UNPAID = 'unpaid',
  PAID = 'paid',
}

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.UNPAID, // Optional: set default status
  })
  status: BookingStatus;
}
