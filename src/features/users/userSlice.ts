import { fetchUsers as fetchUsersApi } from '@/services/userService';
import { User } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
    users: User[];
    filteredUsers: User[];
    isLoading: boolean;
    error: string | null;
    currentPage: number;
    itemsPerPage: number;
    searchTerm: string;
}

const initialState: UserState = {
    users: [],
    filteredUsers: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 5,
    searchTerm: '',
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetchUsersApi();
    return response;
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.filteredUsers = state.users.filter(
                (user) =>
                    user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                    user.email.toLowerCase().includes(action.payload.toLowerCase())
            );
            state.currentPage = 1;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
            state.filteredUsers = state.filteredUsers.filter(
                (user) => user.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.filteredUsers = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    },
});

export const { setCurrentPage, setSearchTerm, deleteUser } = userSlice.actions;
export default userSlice.reducer; 