import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() { }

  register() {
    return { message: "registered successfully" };
  }

  login() {
    return { message: "logged in successfully" };
  }

  logout() {
    return { message: "logged out successfully" };
  }
}
