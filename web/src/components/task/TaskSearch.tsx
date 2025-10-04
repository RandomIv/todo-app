'use client'
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

type TaskSearchProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

export function TaskSearch({ searchQuery, setSearchQuery }: TaskSearchProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
            />
        </div>
    );
}