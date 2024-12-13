'use client';

import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import OverviewCard from '@/components/analytics/OverviewCard';
import RegionFilter from '@/components/analytics/RegionFilter';
import {
    fetchAnalyticsData,
    setDateRange,
    setSelectedRegion
} from '@/features/analytics/analyticsSlice';
import { AppDispatch, RootState } from '@/store/store';
import { CHART_COLORS, CHART_PALETTE } from '@/utils/colors';
import { ArchiveBoxXMarkIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

export default function AnalyticsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading, error, dateRange, selectedRegion } = useSelector(
        (state: RootState) => state.analytics
    );

    useEffect(() => {
        dispatch(fetchAnalyticsData());
    }, [dispatch, dateRange, selectedRegion]);

    const handleDateRangeChange = (start: string, end: string) => {
        dispatch(setDateRange({ start, end }));
    };

    const handleRegionChange = (region: string | null) => {
        dispatch(setSelectedRegion(region));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return null;

    // Get unique regions from the data
    const regions = Array.from(
        new Set(data.usersByRegion.map((item) => item.region))
    );

    // Filter data based on selected region
    const filteredUsersByRegion = selectedRegion
        ? data.usersByRegion.filter((item) => item.region === selectedRegion)
        : data.usersByRegion;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateRangeFilter
                        startDate={dateRange.start}
                        endDate={dateRange.end}
                        onDateChange={handleDateRangeChange}
                    />
                    <RegionFilter
                        regions={regions}
                        selectedRegion={selectedRegion}
                        onRegionChange={handleRegionChange}
                    />
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <OverviewCard
                    title="Total Users"
                    value={data.totalUsers}
                    icon={UsersIcon}
                    color={CHART_COLORS.primary}
                />
                <OverviewCard
                    title="Active Users"
                    value={data.activeUsers}
                    icon={UserGroupIcon}
                    color={CHART_COLORS.success}
                />
                <OverviewCard
                    title="Deleted Users"
                    value={data.deletedUsers}
                    icon={ArchiveBoxXMarkIcon}
                    color={CHART_COLORS.error}
                />
            </div>

            {/* Charts */}
            <div className="space-y-6">
                {/* Registration Trend */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">User Registration Trend</h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.registrationTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip />
                                <Line 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke={CHART_COLORS.primary}
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Users by Status */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Users by Status</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.usersByStatus}
                                        dataKey="count"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {data.usersByStatus.map((_, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={CHART_PALETTE[index % CHART_PALETTE.length]} 
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Users by Region */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Users by Region</h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={filteredUsersByRegion}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="region" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip />
                                    <Bar 
                                        dataKey="count" 
                                        fill={CHART_COLORS.secondary}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 