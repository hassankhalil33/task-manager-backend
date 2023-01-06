import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getAllUsers(req: Request) {
    const decodedUser = req.user as { email: string; level: string }
    if (decodedUser.level !== "SUPER_ADMIN") {
      throw new UnauthorizedException();
    }

    const allUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        userType: true
      }
    })

    if (!allUsers) {
      throw new NotFoundException("no users found");
    }

    return { allUsers }
  }

  async getUser(req: Request, id: string) {
    const decodedUser = req.user as { email: string; level: string }
    const user = await this.prisma.user.findUnique({
      where: {
        id: +id
      },
      include: {
        tasksAssigned: true,
        tasksCreated: true
      }
    })

    delete user.password;

    if (decodedUser.email !== user.email && decodedUser.level == "NORMAL") {
      throw new UnauthorizedException();
    }

    if (!user) {
      throw new NotFoundException("user not found");
    }

    return { user };
  }

  async updateUser(req: Request, userDto: UserDto) {
    const decodedUser = req.user as { email: string; level: string }
    let hashedPassword;
    if (decodedUser.level !== "SUPER_ADMIN") {
      throw new UnauthorizedException();
    }

    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: +userDto.id
      }
    })

    if (!userToUpdate) {
      throw new NotFoundException("user not found");
    }

    if (userToUpdate.userType === "SUPER_ADMIN") {
      throw new UnauthorizedException();
    }

    if (userDto.password) {
      hashedPassword = await this.hashPassword(userDto.password);
    }
    await this.prisma.user.update({
      where: {
        id: +userDto.id
      },
      data: {
        email: userDto.email,
        password: hashedPassword,
        userType: userDto.user_type
      }
    })

    return { message: "user updated successfully" }
  }

  async deleteUser(req: Request, userDto: UserDto) {
    const decodedUser = req.user as { email: string; level: string }
    if (decodedUser.level !== "SUPER_ADMIN") {
      throw new UnauthorizedException();
    }

    const userToUpdate = await this.prisma.user.findUnique({
      where: {
        id: +userDto.id
      }
    })

    if (!userToUpdate) {
      throw new NotFoundException("user doesnt exist");
    }

    if (userToUpdate.userType === "SUPER_ADMIN") {
      throw new UnauthorizedException();
    }

    await this.prisma.user.delete({
      where: {
        id: +userDto.id
      }
    })

    return { message: "user deleted from database" }
  }

  async hashPassword(password: string) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}
