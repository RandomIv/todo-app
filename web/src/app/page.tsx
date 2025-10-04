'use client'
import { useState } from 'react';
import { TaskList } from '@/components/task/TaskList';
import { TaskHeader } from "@/components/task/TaskHeader";
import { AddTaskDialog } from '@/components/task/AddTaskDialog';
import { EditTaskDialog } from '@/components/task/EditTaskDialog';
import type { Task } from '@/types/task';

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
        <div className="page-container">
            <div className="content-wrapper">
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