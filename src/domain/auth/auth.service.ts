import { AuthorizationHelper } from './helpers';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/shared/entities';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly authorizationHelper = new AuthorizationHelper();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async authCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      return null;
    }

    const isMatch = await this.authorizationHelper.ComparePassword(
      credentials.password,
      user.password,
    );

    if (isMatch) {
      const { password, ...result } = user;
      return {
        accessToken: await this.jwtService.sign(result),
        user: result,
      };
    }

    return null;
  }
}
