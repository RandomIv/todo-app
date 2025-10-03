import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma';
import { Task } from 'generated/prisma';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

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

  const prismaMock = {
    task: {
      findMany: jest.fn().mockImplementation(({ where, orderBy }) => {
        let results = [...mockTasks];
        if (where) {
          if (where.done !== undefined)
            results = results.filter((t) => t.done === where.done);
          if (where.priority !== undefined)
            results = results.filter((t) => t.priority === where.priority);
          if (where.title?.contains) {
            const search = where.title.contains.toLowerCase();
            results = results.filter((t) =>
              t.title.toLowerCase().includes(search),
            );
          }
        }
        if (orderBy?.priority) {
          results.sort((a, b) =>
            orderBy.priority === 'asc'
              ? a.priority - b.priority
              : b.priority - a.priority,
          );
        }
        return results;
      }),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return all tasks', async () => {
    const tasks = await service.findMany();
    expect(tasks).toHaveLength(mockTasks.length);
  });

  it('should filter by done', async () => {
    const tasks = await service.findMany({ done: true });
    expect(tasks.every((t) => t.done)).toBe(true);
  });

  it('should filter by priority', async () => {
    const tasks = await service.findMany({ priority: 5 });
    expect(tasks.every((t) => t.priority === 5)).toBe(true);
  });

  it('should search by title', async () => {
    const tasks = await service.findMany({ search: 'important' });
    expect(
      tasks.every((t) => t.title.toLowerCase().includes('important')),
    ).toBe(true);
  });

  it('should sort by priority ascending', async () => {
    const tasks = await service.findMany({ sortByPriority: 'asc' });
    for (let i = 0; i < tasks.length - 1; i++) {
      expect(tasks[i].priority).toBeLessThanOrEqual(tasks[i + 1].priority);
    }
  });

  it('should sort by priority descending', async () => {
    const tasks = await service.findMany({ sortByPriority: 'desc' });
    for (let i = 0; i < tasks.length - 1; i++) {
      expect(tasks[i].priority).toBeGreaterThanOrEqual(tasks[i + 1].priority);
    }
  });
});
