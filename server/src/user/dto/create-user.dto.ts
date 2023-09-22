import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'The email should look like an email' })
  email: string;

  @IsString({ message: 'The password should be a string' })
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'The password must consist only of letters and numbers',
  })
  @MinLength(6, { message: 'The password must have at least 6 characters' })
  password: string;
}
