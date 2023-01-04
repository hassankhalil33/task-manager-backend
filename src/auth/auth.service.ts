import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async register(authDto: AuthDto) {
    const { email, password } = authDto;

    const foundUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (foundUser) {
      throw new BadRequestException("email already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      }
    })

    return { message: "registered successfully" };
  }

  async login() {
    return { message: "logged in successfully" };
  }

  async logout() {
    return { message: "logged out successfully" };
  }

  async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}
