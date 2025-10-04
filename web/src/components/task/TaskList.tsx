'use client'
import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="icon-xl animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-8 text-center">
                <p className="text-red-600">Failed to load tasks.</p>
            </Card>
        );
    }

    return (
        <div className="section-gap">
            <TaskStats {...stats} />

            <div className="grid-controls">
                <TaskFilter filter={filter} setFilter={setFilter} />
                <TaskSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <TaskSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>

            <div className="card-gap">
                {processedTasks.length === 0 ? (
                    <Card>
                        <div className="empty-state-container">
                            <div className="empty-state-icon">
                                <CheckCircle2 className="icon-xl text-gray-400" />
                            </div>
                            <p className="empty-state-title">No tasks found</p>
                            <p className="empty-state-description">
                                {filter === 'completed'
                                    ? 'Complete some tasks to see them here'
                                    : 'Create a new task to get started'}
                            </p>
                        </div>
                    </Card>
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