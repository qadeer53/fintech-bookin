import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail(
      {},
      {
        message: 'Email must be a valid email',
      },
  )
  @IsNotEmpty({
    message: 'Email should not be empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password should not be empty',
  })
  password: string;
}
