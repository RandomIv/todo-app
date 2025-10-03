import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, Prisma } from 'generated/prisma';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findMany(
    @Query('done') done?: string,
    @Query('priority') priority?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: 'asc' | 'desc',
  ): Promise<Task[]> {
    const params = {
      done: done !== undefined ? done === 'true' : undefined,
      priority: priority ? Number(priority) : undefined,
      search,
      sortByPriority: sort,
    };
    return this.tasksService.findMany(params);
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
