import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";
import { Status } from "@prisma/client";

export class TaskUpdateDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  assigneeId: string;

  @IsOptional()
  @IsEnum(Status)
  status: Status;
}
