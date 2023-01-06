import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { "message": "password needs to be between 8 and 20 chars long" })
  password: string;
}
