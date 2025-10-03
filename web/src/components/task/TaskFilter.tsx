'use client'
type TaskFilterProps = {
    filter: string;
    setFilter: (f: string) => void;
};

export function TaskFilter({ filter, setFilter }: TaskFilterProps) {
    return (
        <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-lg w-fit">
            {['all', 'active', 'completed'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                        filter === f
                            ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}
