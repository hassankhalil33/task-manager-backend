import {
  Controller,
  Delete,
  Get,
  Body,
  Put,
  Param,
  UseGuards,
  Req
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers(@Req() req) {
    return this.userService.getAllUsers(req);
  }

  @Get("/:id")
  getUser(@Req() req, @Param() params: { id: string }) {
    return this.userService.getUser(req, params.id);
  }

  @Put()
  updateUser(@Req() req, @Body() userDto: UserDto) {
    return this.userService.updateUser(req, userDto);
  }

  @Delete()
  deleteUser(@Req() req, @Body() userDto: UserDto) {
    return this.userService.deleteUser(req, userDto);
  }
}
