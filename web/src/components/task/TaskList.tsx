'use client'
import { useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskStats } from './TaskStats';
import { TaskFilter } from './TaskFilter';
import {useTasks} from "@/hooks/useTasks";

export function TaskList() {
    const [filter, setFilter] = useState('all');
    const { data: tasks, isLoading, error } = useTasks();
    const taskList = tasks || [];

    const handleToggle = (id: string) => {
        console.log('Toggle task', id);
    };

    const handleDelete = (id: string) => {
        console.log('Delete task', id);

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
                        />
                    ))
                )}
            </div>
        </div>
    );
}