import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register() {
    return this.authService.register();
  }

  @Post("/login")
  login() {
    return this.authService.login();
  }

  @Get("/logout")
  logout() {
    return this.authService.logout();
  }
}
