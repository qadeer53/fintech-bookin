import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordHashed = this.isBcryptHashed(password);
    if (
      user && isPasswordHashed
        ? password === user.password
        : await this.comparePasswords(password, user?.password)
    ) {
      return user;
    }
    return null;
  }

  private isBcryptHashed(password: string) {
    const bcryptHashRegex = /^\$2[aby]\$/;
    return bcryptHashRegex.test(password);
  }
  private async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: { id: user.id, role: user.role },
    };
    return this.jwtService.sign(payload);
  }
}
