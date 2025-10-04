'use client'
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

type TaskStatsProps = {
    total: number;
    active: number;
    completed: number;
};

export function TaskStats({ total, active, completed }: TaskStatsProps) {
    return (
        <div className="grid-stats">
            <Card className="stats-card-indigo">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="stats-label text-indigo-600 dark:text-indigo-400">Total Tasks</p>
                        <p className="stats-value text-indigo-900 dark:text-indigo-100">{total}</p>
                    </div>
                    <div className="stats-icon-badge bg-indigo-500">
                        <CheckCircle2 className="icon-lg text-white" />
                    </div>
                </div>
            </Card>

            <Card className="stats-card-amber">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="stats-label text-amber-600 dark:text-amber-400">Active</p>
                        <p className="stats-value text-amber-900 dark:text-amber-100">{active}</p>
                    </div>
                    <div className="stats-icon-badge bg-amber-500">
                        <CheckCircle2 className="icon-lg text-white" />
                    </div>
                </div>
            </Card>

            <Card className="stats-card-green">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="stats-label text-green-600 dark:text-green-400">Completed</p>
                        <p className="stats-value text-green-900 dark:text-green-100">{completed}</p>
                    </div>
                    <div className="stats-icon-badge bg-green-500">
                        <CheckCircle2 className="icon-lg text-white" />
                    </div>
                </div>
            </Card>
        </div>
    );
}
