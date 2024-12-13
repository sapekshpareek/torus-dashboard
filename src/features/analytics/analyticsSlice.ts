import { fetchAnalyticsData as fetchAnalyticsDataApi } from '@/services/analyticsService';
import { AnalyticsData } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AnalyticsState {
    data: AnalyticsData | null;
    isLoading: boolean;
    error: string | null;
    dateRange: {
        start: string;
        end: string;
    };
    selectedRegion: string | null;
}

const initialState: AnalyticsState = {
    data: null,
    isLoading: false,
    error: null,
    dateRange: {
        start: new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
    },
    selectedRegion: null,
};

export const fetchAnalyticsData = createAsyncThunk(
    'analytics/fetchData',
    async () => {
        const response = await fetchAnalyticsDataApi();
        return response;
    }
);

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setDateRange: (state, action) => {
            state.dateRange = action.payload;
        },
        setSelectedRegion: (state, action) => {
            state.selectedRegion = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAnalyticsData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch analytics data';
            });
    },
});

export const { setDateRange, setSelectedRegion } = analyticsSlice.actions;
export default analyticsSlice.reducer; 