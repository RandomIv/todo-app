'use client'
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Trash2, Pencil } from 'lucide-react'; // Додаємо іконку
import type { Task } from '@/types/task';
import React from 'react';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const getPriorityColor = (priority: number) => {
        if (priority >= 8) return 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900';
        if (priority >= 5) return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900';
        return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900';
    };

    return (
        <Card className={`group border-l-4 hover:shadow-lg ${
            task.done ? 'border-l-green-500 bg-gray-50/50 dark:bg-gray-900/50' : 'border-l-indigo-500 bg-white dark:bg-gray-950'
        }`}>
            <div className="flex items-center gap-4 p-5">
                <button onClick={() => onToggle(task.id)}>
                    {task.done ? <CheckCircle2 className="w-6 h-6 text-green-500"/> : <Circle className="w-6 h-6 text-gray-400 hover:text-indigo-500"/>}
                </button>
                <div className="flex-1 min-w-0">
                    <h6 className={task.done ? 'line-through text-gray-400 text-4xl' : 'text-gray-900 dark:text-gray-100 text-4xl'}>
                        {task.title}
                    </h6>
                    <div className="flex items-center flex-wrap mt-2 text-sm gap-4">
                        <Badge variant="outline" className={`${getPriorityColor(task.priority)} px-3 py-1 text-xs font-medium`}>
                            Priority: {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Clock className="w-4 h-4"/>
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(task)} className="p-2 text-gray-400 hover:text-blue-500">
                        <Pencil className="w-5 h-5"/>
                    </button>
                    <button onClick={() => onDelete(task.id)} className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </Card>
    );
};