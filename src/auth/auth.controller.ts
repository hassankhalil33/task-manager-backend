import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post("/login")
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
