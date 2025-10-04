'use client'
type TaskFilterProps = {
    filter: string;
    setFilter: (f: string) => void;
};

export function TaskFilter({ filter, setFilter }: TaskFilterProps) {
    return (
        <div className="filter-container">
            {['all', 'active', 'completed'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={filter === f ? 'filter-tab-active' : 'filter-tab-inactive'}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
}
