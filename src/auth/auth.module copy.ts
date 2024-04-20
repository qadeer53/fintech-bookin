import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { jwtConstants } from './constants';
import { EmailModule } from '../email/email.module';
import { JwtStrategy } from './jwt.strategy';
import {BusinessModule} from "../business/business.module";
import {EmailExistValidation} from "./custom-validations/email-exist.validation";

@Module({
  imports: [
    PassportModule,
    UserModule,
    EmailModule,
    BusinessModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, EmailExistValidation],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
