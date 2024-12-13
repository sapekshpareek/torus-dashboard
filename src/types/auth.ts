export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: null | {
        email: string;
        name: string;
    };
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
} 