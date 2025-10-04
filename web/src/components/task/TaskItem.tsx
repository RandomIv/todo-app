'use client'
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Clock, Trash2, Pencil } from 'lucide-react';
import type { Task } from '@/types/task';
import React from 'react';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const getPriorityClass = (priority: number) => {
        if (priority >= 8) return 'priority-high';
        if (priority >= 5) return 'priority-medium';
        return 'priority-low';
    };

    return (
        <Card className={task.done ? 'card-task-completed' : 'card-task-active'}>
            <div className="flex items-center gap-4 p-[var(--spacing-card)]">
                <button onClick={() => onToggle(task.id)} className="btn-icon-primary mt-1">
                    {task.done ?
                        <CheckCircle2 className="icon-lg text-green-500"/> :
                        <Circle className="icon-lg"/>
                    }
                </button>

                <div className="flex-1 min-w-0">
                    <h6 className={task.done ? 'text-completed text-4xl' : 'heading-card text-4xl'}>
                        {task.title}
                    </h6>
                    <div className="flex items-center flex-wrap mt-2 gap-4">
                        <Badge variant="outline" className={getPriorityClass(task.priority)}>
                            Priority: {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-meta">
                            <Clock className="icon-sm"/>
                            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(task)} className="btn-icon-info p-2">
                        <Pencil className="icon-md"/>
                    </button>
                    <button onClick={() => onDelete(task.id)} className="btn-icon-danger p-2">
                        <Trash2 className="icon-md"/>
                    </button>
                </div>
            </div>
        </Card>
    );
};