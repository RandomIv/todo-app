'use client'
import { Card } from '@/components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

type TaskStatsProps = {
    total: number;
    active: number;
    completed: number;
};

export function TaskStats({ total, active, completed }: TaskStatsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-indigo-600">Total Tasks</p>
                        <p className="text-3xl font-bold text-indigo-900">{total}</p>
                    </div>
                    <div className="p-3 bg-indigo-500 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-amber-600">Active</p>
                        <p className="text-3xl font-bold text-amber-900">{active}</p>
                    </div>
                    <div className="p-3 bg-amber-500 rounded-full">
                        <Circle className="w-6 h-6 text-white" />
                    </div>
                </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-green-600">Completed</p>
                        <p className="text-3xl font-bold text-green-900">{completed}</p>
                    </div>
                    <div className="p-3 bg-green-500 rounded-full">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                </div>
            </Card>
        </div>
    );
}
