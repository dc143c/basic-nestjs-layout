import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizingDTO } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDTO: AuthorizingDTO) {
    const { accessToken } = await this.authService.authCredentials(loginDTO);
    return { token: accessToken };
  }

  @UseGuards(LocalAuthGuard)
  @Get('logout')
  async logOut(@Req() req: any) {
    return req.user;
  }
}
