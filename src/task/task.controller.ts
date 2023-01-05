import { Controller, Get, UseGuards, Post, Put, Delete, Param, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { TaskCreateDto } from './dtos/taskcreate.dto';
import { TaskUpdateDto } from './dtos/taskupdate.dto';
import { TaskService } from './task.service';

@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get("/:id")
  getTask(@Param() params: { id: string }) {
    return this.taskService.getTask(params.id);
  }

  @Post()
  createTask(@Req() req, @Body() taskDto: TaskCreateDto) {
    return this.taskService.createTask(req, taskDto);
  }

  @Put()
  updateTask(@Req() req, @Body() taskDto: TaskUpdateDto) {
    return this.taskService.updateTask(req, taskDto);
  }

  @Delete()
  deleteTask(@Req() req, @Body() taskDto: TaskUpdateDto) {
    return this.taskService.deleteTask(req, taskDto);
  }
}
