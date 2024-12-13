import { User } from '@/types';

// Mock user data
const mockUsers: User[] = Array.from({ length: 20 }, (_, index) => ({
    id: `user-${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: index % 3 === 0 ? 'inactive' : 'active',
    region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
    registrationDate: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
}));

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUsers = async (): Promise<User[]> => {
    await delay(1000);
    return mockUsers;
}; 