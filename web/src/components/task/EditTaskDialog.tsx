'use client'
import { useState, type FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useTaskMutations } from '@/hooks/useTaskMutations';
import type { Task } from '@/types/task';

type EditTaskDialogProps = {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
};

export function EditTaskDialog({ task, isOpen, onClose }: EditTaskDialogProps) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState(5);
    const [date, setDate] = useState('');
    const { updateTask } = useTaskMutations();

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setPriority(task.priority);
            setDate(new Date(task.createdAt).toISOString().split('T')[0]); // Форматуємо дату для <input type="date">
        }
    }, [task]);

    if (!task) return null;

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const updatedData: Partial<Task> = {};
        if (title.trim() && title.trim() !== task.title) {
            updatedData.title = title.trim();
        }
        if (priority !== task.priority) {
            updatedData.priority = priority;
        }
        if (new Date(date).toISOString() !== new Date(task.createdAt).toISOString()) {
            updatedData.createdAt = new Date(date).toISOString();
        }

        if (Object.keys(updatedData).length > 0) {
            updateTask({ id: task.id, data: updatedData });
        }
        onClose();
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className='sm:max-w-md w-full p-6 bg-white rounded-lg shadow-lg'>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Title</label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Priority</label>
                        <Select value={String(priority)} onValueChange={(val) => setPriority(Number(val))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Set priority" />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(p => (
                                    <SelectItem key={p} value={String(p)}>{p}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label>Date</label>
                        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}