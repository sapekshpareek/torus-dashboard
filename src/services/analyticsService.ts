import { AnalyticsData } from '@/types';

const generateMockRegistrationTrend = () => {
    const data = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(date.getMonth() - i);
        data.push({
            date: date.toISOString().slice(0, 7), // YYYY-MM format
            count: Math.floor(Math.random() * 50) + 10,
        });
    }
    return data;
};

const mockAnalyticsData: AnalyticsData = {
    totalUsers: 156,
    activeUsers: 123,
    deletedUsers: 33,
    registrationTrend: generateMockRegistrationTrend(),
    usersByStatus: [
        { status: 'active', count: 123 },
        { status: 'inactive', count: 33 },
    ],
    usersByRegion: [
        { region: 'North', count: 45 },
        { region: 'South', count: 38 },
        { region: 'East', count: 41 },
        { region: 'West', count: 32 },
    ],
};

export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockAnalyticsData;
}; 