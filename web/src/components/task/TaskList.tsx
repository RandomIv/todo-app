'use client'
import { useState, useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { TaskStats } from './TaskStats';
import { TaskFilter } from './TaskFilter';
import { TaskSearch } from './TaskSearch';
import { TaskSort } from './TaskSort';
import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from '@/hooks/useTaskMutations';
import type { Task } from '@/types/task';

type SortOrder = 'priority-asc' | 'priority-desc' | 'default';

interface TaskListProps {
    onEdit: (task: Task) => void;
}

export function TaskList({ onEdit }: TaskListProps) {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<SortOrder>('default');

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

    const processedTasks = useMemo(() => {
        let processed = [...taskList];

        if (filter === 'active') {
            processed = processed.filter(task => !task.done);
        } else if (filter === 'completed') {
            processed = processed.filter(task => task.done);
        }

        if (searchQuery) {
            processed = processed.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortOrder === 'priority-asc') {
            processed.sort((a, b) => a.priority - b.priority);
        } else if (sortOrder === 'priority-desc') {
            processed.sort((a, b) => b.priority - a.priority);
        }

        return processed;
    }, [taskList, filter, searchQuery, sortOrder]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TaskFilter filter={filter} setFilter={setFilter} />
                <TaskSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <TaskSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

            <div className="flex flex-col gap-3">
                {processedTasks.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">
                        No tasks found
                    </p>
                ) : (
                    processedTasks.map((task) => (
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