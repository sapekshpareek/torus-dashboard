interface DateRangeFilterProps {
    startDate: string;
    endDate: string;
    onDateChange: (start: string, end: string) => void;
}

export default function DateRangeFilter({
    startDate,
    endDate,
    onDateChange,
}: DateRangeFilterProps) {
    return (
        <div className="flex items-center space-x-4">
            <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
                    Start Date
                </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => onDateChange(e.target.value, endDate)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:border-indigo-400 transition-colors duration-200"
                />
            </div>
            <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
                    End Date
                </label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => onDateChange(startDate, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:border-indigo-400 transition-colors duration-200"
                />
            </div>
        </div>
    );
} 