import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async validateUserById(userId: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findUserWithRelations(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['business', 'business.pictures', 'subscription'],
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<void> {
    const _password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(userId, {
      password: _password,
    });
  }
}
