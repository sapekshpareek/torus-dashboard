import { configureStore } from '@reduxjs/toolkit';
import analyticsReducer from '../features/analytics/analyticsSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        analytics: analyticsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 