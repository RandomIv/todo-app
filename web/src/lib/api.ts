import type { Task } from '@/types/task';

const BASE_URL = 'https://todo-app-backend-production-2c65.up.railway.app/';


export async function getTasks(): Promise<Task[]> {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
}


export async function addTask(task: { title: string; priority: number }): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to add task');
    return res.json();
}


export async function updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return res.json();
}


export async function deleteTask(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
}
