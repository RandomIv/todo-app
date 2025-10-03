import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Task, Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Task[]> {
    return this.prisma.task.findMany();
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
