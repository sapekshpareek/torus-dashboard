import { LoginCredentials } from '@/types/auth';

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginUser = async (credentials: LoginCredentials) => {
    await delay(1000); // Simulate API delay

    // Mock validation
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin123') {
        return {
            email: credentials.email,
            name: 'Admin User',
        };
    }

    throw new Error('Invalid credentials');
}; 