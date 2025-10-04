'use client'

import { Plus } from "lucide-react";

type TaskHeaderProps = {
    onAddTask?: () => void;
};

export function TaskHeader({ onAddTask }: TaskHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    My Tasks
                </h1>
                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                >
                    <Plus className="w-5 h-5" />
                    New Task
                </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
                Manage your daily tasks efficiently
            </p>
        </div>
    );
}