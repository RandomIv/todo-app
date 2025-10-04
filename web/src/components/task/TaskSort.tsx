'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SortOrder = 'priority-asc' | 'priority-desc' | 'default';

type TaskSortProps = {
    sortOrder: SortOrder;
    setSortOrder: (order: SortOrder) => void;
};

export function TaskSort({ sortOrder, setSortOrder }: TaskSortProps) {
    return (
        <Select value={sortOrder} onValueChange={(value: SortOrder) => setSortOrder(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="priority-asc">Priority Asc</SelectItem>
                <SelectItem value="priority-desc">Priority Desc</SelectItem>
            </SelectContent>
        </Select>
    );
}