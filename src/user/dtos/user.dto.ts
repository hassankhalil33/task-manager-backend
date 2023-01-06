import { IsNotEmpty, IsString, IsEmail, Length, IsOptional, IsEnum } from "class-validator";
import { Role } from "@prisma/client";

export class UserDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(8, 20, { "message": "password needs to be between 8 and 20 chars long" })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  user_type: Role;
}
