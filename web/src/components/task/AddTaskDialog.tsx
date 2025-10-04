'use client'
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useTaskMutations } from '@/hooks/useTaskMutations';

type AddTaskDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function AddTaskDialog({ isOpen, onClose }: AddTaskDialogProps) {
    const [title, setTitle] = useState('');
    const { addTask } = useTaskMutations();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (title.trim()) {
            addTask({ title: title.trim(), priority: 5 });
            onClose();
            setTitle('');
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create a New Task
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        className="w-full"
                    />
                    <DialogFooter className="flex justify-end gap-2 mt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                                setTitle('');
                                onClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Add Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}