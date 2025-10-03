'use client'
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/lib/api';
import type { Task } from '@/types/task';

export function useTasks() {
    return useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: getTasks,
    });
}