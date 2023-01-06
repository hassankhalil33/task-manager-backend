import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async register(authDto: AuthDto) {
    const { email, password } = authDto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (foundUser) {
      throw new BadRequestException("email already exists");
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      }
    })

    delete user.password;

    return { user };
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto;
    const foundUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!foundUser) {
      throw new BadRequestException("incorrect credentials");
    }

    const compareSuccess = await this.comparePasswords(password, foundUser.password);
    if (!compareSuccess) {
      throw new BadRequestException("incorrect credentials");
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      level: foundUser.userType
    }
    const token = await this.signToken(payload);

    return { token };
  }

  async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async signToken(payload: { email: string; level: string }) {
    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return token;
  }
}
