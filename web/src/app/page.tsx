'use client'
import { useState } from 'react';
import { TaskList } from '@/components/task/TaskList';
import { TaskHeader } from "@/components/task/TaskHeader";
import { AddTaskDialog } from '@/components/task/AddTaskDialog';
import { EditTaskDialog } from '@/components/task/EditTaskDialog'; // Імпортуємо
import type { Task } from '@/types/task'; // Імпортуємо

export default function HomePage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCloseEdit = () => {
        setEditingTask(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-5xl mx-auto p-8">
                <TaskHeader onAddTask={() => setIsAddModalOpen(true)} />
                <TaskList onEdit={handleEdit} />
                <AddTaskDialog isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
                <EditTaskDialog
                    isOpen={!!editingTask}
                    onClose={handleCloseEdit}
                    task={editingTask}
                />
            </div>
        </div>
    );
}