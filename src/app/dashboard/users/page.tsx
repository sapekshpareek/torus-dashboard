'use client';

import Pagination from '@/components/common/Pagination';
import SearchBar from '@/components/users/SearchBar';
import UserTable from '@/components/users/UserTable';
import { deleteUser, fetchUsers, setCurrentPage, setSearchTerm } from '@/features/users/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UsersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {
        filteredUsers,
        isLoading,
        error,
        currentPage,
        itemsPerPage,
        searchTerm,
    } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSearch = (value: string) => {
        dispatch(setSearchTerm(value));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteUser(id));
    };

    const handleView = (id: string) => {
        // Implement view functionality
        console.log('View user:', id);
    };

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <div className="mt-4">
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <UserTable
                users={paginatedUsers}
                onDelete={handleDelete}
                onView={handleView}
            />
            <Pagination
                currentPage={currentPage}
                totalItems={filteredUsers.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
        </div>
    );
} 