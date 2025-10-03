import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Task, Prisma } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findMany(params?: {
    done?: boolean;
    priority?: number;
    search?: string;
    sortByPriority?: 'asc' | 'desc';
  }): Promise<Task[]> {
    const { done, priority, search, sortByPriority } = params || {};

    const where: Prisma.TaskWhereInput = {};
    if (done !== undefined) where.done = done;
    if (priority !== undefined) where.priority = priority;
    if (search) where.title = { contains: search, mode: 'insensitive' };

    const orderBy = sortByPriority ? { priority: sortByPriority } : undefined;

    return this.prisma.task.findMany({ where, orderBy });
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
