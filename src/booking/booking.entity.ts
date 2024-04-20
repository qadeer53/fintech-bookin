import { Review } from 'src/review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Review, (review) => review.booking)
  reviews: Review[];

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.UNPAID, // Optional: set default status
  })
  status: BookingStatus;
}
