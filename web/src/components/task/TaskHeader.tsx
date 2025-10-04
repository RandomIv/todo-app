'use client'
import { Plus } from "lucide-react";

type TaskHeaderProps = {
    onAddTask?: () => void;
};

export function TaskHeader({ onAddTask }: TaskHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="heading-page">My Tasks</h1>
                <button onClick={onAddTask} className="btn-primary">
                    <Plus className="icon-md" />
                    New Task
                </button>
            </div>
            <p className="text-muted">Manage your daily tasks efficiently</p>
        </div>
    );
}