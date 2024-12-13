interface OverviewCardProps {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color?: string;
}

export default function OverviewCard({ 
    title, 
    value, 
    icon: Icon,
    color = '#6366f1' // default to primary color
}: OverviewCardProps) {
    return (
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div 
                            className="p-3 rounded-full"
                            style={{ backgroundColor: `${color}15` }} // Using hex opacity
                        >
                            <Icon className="h-6 w-6" style={{ color }} />
                        </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold" style={{ color }}>
                                    {value.toLocaleString()}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
} 