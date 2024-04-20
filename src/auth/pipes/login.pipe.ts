import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dtos/login.dto';

export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const loginClass = plainToInstance(LoginDto, value);

    const errors = await validate(loginClass);

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

  private formatErrors(errors: any[]): any {
    return errors.map((err) => {
      for (const property in err.constraints) {
        return { field: err['property'], message: err.constraints[property] };
      }
    });
  }
}
