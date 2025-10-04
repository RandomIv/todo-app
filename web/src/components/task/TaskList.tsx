'use client'
import { useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskStats } from './TaskStats';
import { TaskFilter } from './TaskFilter';
import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from '@/hooks/useTaskMutations';
import type { Task } from '@/types/task';

interface TaskListProps {
    onEdit: (task: Task) => void;
}

export function TaskList({ onEdit }: TaskListProps) {
    const [filter, setFilter] = useState('all');
    const { data: tasks, isLoading, error } = useTasks();
    const { updateTask, deleteTask } = useTaskMutations();

    const taskList = tasks || [];

    const handleToggle = (id: string) => {
        const task = taskList.find(t => t.id === id);
        if (task) {
            updateTask({ id, data: { done: !task.done } });
        }
    };

    const handleDelete = (id: string) => {
        deleteTask(id);
    };

    const filteredTasks = taskList.filter(task => {
        if (filter === 'active') return !task.done;
        if (filter === 'completed') return task.done;
        return true;
    });

    const stats = {
        total: taskList.length,
        active: taskList.filter(t => !t.done).length,
        completed: taskList.filter(t => t.done).length,
    };

    if (isLoading) return <p className="text-center text-gray-500 py-6">Loading tasks...</p>;
    if (error) return <p className="text-center text-red-500 py-6">Failed to load tasks.</p>;

    return (
        <div className="flex flex-col gap-6">
            <TaskStats {...stats} />
            <TaskFilter filter={filter} setFilter={setFilter} />

            <div className="flex flex-col gap-3">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">
                        No tasks found
                    </p>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </div>
    );
}