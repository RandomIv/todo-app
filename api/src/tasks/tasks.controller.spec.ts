import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from 'generated/prisma';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      done: false,
      priority: 5,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Task 2',
      done: true,
      priority: 3,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Important task',
      done: false,
      priority: 1,
      createdAt: new Date(),
    },
  ];

  const serviceMock = {
    findMany: jest.fn().mockImplementation((params) => {
      let results = [...mockTasks];
      if (params) {
        if (params.done !== undefined)
          results = results.filter((t) => t.done === params.done);
        if (params.priority !== undefined)
          results = results.filter((t) => t.priority === params.priority);
        if (params.search)
          results = results.filter((t) =>
            t.title.toLowerCase().includes(params.search.toLowerCase()),
          );
        if (params.sortByPriority === 'asc')
          results.sort((a, b) => a.priority - b.priority);
        if (params.sortByPriority === 'desc')
          results.sort((a, b) => b.priority - a.priority);
      }
      return results;
    }),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: serviceMock }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should return all tasks', async () => {
    const tasks = await controller.findMany();
    expect(tasks).toHaveLength(mockTasks.length);
  });

  it('should filter by done=true', async () => {
    const tasks = await controller.findMany('true');
    expect(tasks.every((t) => t.done)).toBe(true);
  });

  it('should filter by priority', async () => {
    const tasks = await controller.findMany(undefined, '3');
    expect(tasks.every((t) => t.priority === 3)).toBe(true);
  });

  it('should search by title', async () => {
    const tasks = await controller.findMany(undefined, undefined, 'important');
    expect(
      tasks.every((t) => t.title.toLowerCase().includes('important')),
    ).toBe(true);
  });

  it('should sort by priority ascending', async () => {
    const tasks = await controller.findMany(
      undefined,
      undefined,
      undefined,
      'asc',
    );
    for (let i = 0; i < tasks.length - 1; i++) {
      expect(tasks[i].priority).toBeLessThanOrEqual(tasks[i + 1].priority);
    }
  });

  it('should sort by priority descending', async () => {
    const tasks = await controller.findMany(
      undefined,
      undefined,
      undefined,
      'desc',
    );
    for (let i = 0; i < tasks.length - 1; i++) {
      expect(tasks[i].priority).toBeGreaterThanOrEqual(tasks[i + 1].priority);
    }
  });
});
