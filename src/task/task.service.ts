import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { TaskCreateDto } from './dtos/taskcreate.dto';
import { TaskUpdateDto } from './dtos/taskupdate.dto';
import { Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  async getAllTasks(query: { page: string; status: Status; assignee: string }) {
    const perPage = 10; //could be changed or asked from frontend

    const allTasks = await this.prisma.task.findMany({
      where: {
        status: {
          equals: query.status
        },

        assigneeId: {
          equals: query.assignee && +query.assignee
        }
      },

      skip: query.page ? (+query.page - 1) * perPage : 0,
      take: perPage
    })

    if (!allTasks) {
      throw new NotFoundException("no tasks found");
    }

    return { allTasks }
  }

  async getTask(id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id: +id
      }
    })

    if (!task) {
      throw new NotFoundException("task not found");
    }

    return { task }
  }

  async createTask(req: Request, taskDto: TaskCreateDto) {
    const decodedUser = req.user as { id: string; email: string; level: string }

    await this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        assignorId: +decodedUser.id,
        assigneeId: taskDto.assigneeId && +taskDto.assigneeId
      }
    })

    return { message: "task created successfully" }
  }

  async updateTask(req: Request, taskDto: TaskUpdateDto) {
    const decodedUser = req.user as { id: string; email: string; level: string }
    const requestedTaskId = taskDto.id;

    const task = await this.prisma.task.findUnique({
      where: {
        id: +requestedTaskId
      }
    })

    if (decodedUser.level !== "SUPER_ADMIN" && decodedUser.level !== "ADMIN") {
      if (task.assignorId !== +decodedUser.id) {
        throw new UnauthorizedException();
      }
    }

    await this.prisma.task.update({
      where: {
        id: +requestedTaskId
      },
      data: {
        title: taskDto.title,
        description: taskDto.description,
        assigneeId: taskDto.assigneeId && +taskDto.assigneeId,
        status: taskDto.status
      }
    })

    return { message: "task updated successfully" }
  }

  async deleteTask(req: Request, taskDto: TaskUpdateDto) {
    const decodedUser = req.user as { id: string; email: string; level: string }
    const requestedTaskId = taskDto.id;

    const task = await this.prisma.task.findUnique({
      where: {
        id: +requestedTaskId
      }
    })

    if (decodedUser.level !== "SUPER_ADMIN" && decodedUser.level !== "ADMIN") {
      if (task.assignorId !== +decodedUser.id) {
        throw new UnauthorizedException();
      }
    }

    await this.prisma.task.delete({
      where: {
        id: +requestedTaskId
      }
    })

    return { message: "task deleted from database" }
  }
}
