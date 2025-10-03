import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, Prisma } from 'generated/prisma';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findMany(): Promise<Task[]> {
    return this.tasksService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() data: Prisma.TaskCreateInput): Promise<Task> {
    return this.tasksService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Task> {
    return this.tasksService.delete(id);
  }
}
