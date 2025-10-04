'use client'
import { useState } from 'react';
import { TaskList } from '@/components/task/TaskList';
import { TaskHeader } from "@/components/task/TaskHeader";
import { AddTaskDialog } from '@/components/task/AddTaskDialog';

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-5xl mx-auto p-8">
                <TaskHeader onAddTask={() => setIsModalOpen(true)} />
                <TaskList />
                <AddTaskDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}