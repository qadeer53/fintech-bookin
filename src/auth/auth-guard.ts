import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];

    try {
      const payload = this.jwtService.verify(token);

      if (!payload) {
        return false;
      }

      request.user = payload.sub;

      return true;
    } catch (e) {
      return false;
    }
  }
}
