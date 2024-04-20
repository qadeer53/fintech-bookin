import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginPipe } from './pipes/login.pipe';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  @UsePipes(new LoginPipe())
  async login(@Body() req: LoginDto) {
    const user = await this.authService.validateUser(req.email, req.password);

    const userWithRelation = await this.userService.findUserById(user.id);

    return {
      token: await this.authService.login(user),
      user: userWithRelation,
      success: true,
    };
  }
}
