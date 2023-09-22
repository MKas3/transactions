import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../types/types';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user)
      throw new UnauthorizedException(
        'Пользователь с таким email не существует',
      );

    const areSamePasswords = await argon2.verify(user.password, password);
    if (areSamePasswords) {
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Неверный пароль');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }

  async registration(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
