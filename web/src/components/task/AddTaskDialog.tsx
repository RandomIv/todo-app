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
            <DialogContent className="dialog-content">
                <DialogHeader>
                    <DialogTitle className="heading-section">
                        Create a New Task
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="section-gap">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                    />
                    <DialogFooter className="flex gap-2">
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
                        <Button type="submit" className="btn-primary">
                            Add Task
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
