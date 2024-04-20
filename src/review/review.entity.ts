import { Booking } from 'src/booking/booking.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user' })
  user: User;

  @ManyToOne(() => Booking)
  @JoinColumn({ name: 'booking' })
  booking: Booking;
}
