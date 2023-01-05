import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class TaskCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  assigneeId: string;
}
