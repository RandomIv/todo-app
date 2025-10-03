import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Task, Prisma } from 'generated/prisma';
import { FindTasksDto } from './dtos/find-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: FindTasksDto): Promise<Task[]> {
    const { done, priority, search, sortByPriority } = params || {};

    return this.prisma.task.findMany({
      where: {
        ...(done !== undefined && { done }),
        ...(priority !== undefined && { priority }),
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
      },
      ...(sortByPriority && { orderBy: { priority: sortByPriority } }),
    });
  }

  async findOne(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
