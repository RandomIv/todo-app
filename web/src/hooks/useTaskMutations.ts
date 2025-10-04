'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask, deleteTask, updateTask } from '@/lib/api';
import type { Task } from '@/types/task';

export function useTaskMutations() {
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
    };

    const addMutation = useMutation({
        mutationFn: (newTask: { title: string; priority: number }) => addTask(newTask),
        onSuccess,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Task> }) => updateTask(id, data),
        onSuccess,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteTask(id),
        onSuccess,
    });

    return {
        addTask: addMutation.mutate,
        updateTask: updateMutation.mutate,
        deleteTask: deleteMutation.mutate,
    };
}