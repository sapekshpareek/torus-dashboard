export interface User {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive';
    region: string;
    registrationDate: string;
}

export interface AnalyticsData {
    totalUsers: number;
    activeUsers: number;
    deletedUsers: number;
    registrationTrend: {
        date: string;
        count: number;
    }[];
    usersByStatus: {
        status: string;
        count: number;
    }[];
    usersByRegion: {
        region: string;
        count: number;
    }[];
} 