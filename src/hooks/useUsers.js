/**
 * useUsers Hook
 *
 * Purpose:
 * Custom React hook to manage **User CRUD operations** in the admin panel.
 * It handles fetching users, creating new users, updating existing users,
 * and deleting users while managing loading states and UI notifications.
 *
 * Features:
 * - Fetch users from backend
 * - Handle paginated API responses
 * - Create new users
 * - Update user information
 * - Delete users
 * - Manage loading state
 * - Show success/error messages using Ant Design
 *
 * Architecture Flow:
 * Component
 *    ↓
 * useUsers Hook
 *    ↓
 * API Service Layer (functionapi.js)
 *    ↓
 * Axios Instance
 *    ↓
 * Backend API
 */

import { useState, useEffect } from 'react';
import {
    getUsersApi,
    createUserApi,
    updateUserApi,
    deleteUserApi
} from '../helper/functionapi';

import { message } from 'antd';



export const useUsers = () => {

    /**
     * ===============================
     * Local State
     * ===============================
     */

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);



    /**
     * ===============================
     * Fetch Users
     * ===============================
     *
     * Retrieves user list from backend API.
     * Handles both normal and paginated responses.
     */

    const fetchUsers = async () => {

        setLoading(true);

        try {

            const response = await getUsersApi();

            /**
             * Handle paginated response:
             * { data, total, page, limit }
             */

            const usersData =
                response.data?.data ||
                response.data ||
                [];

            /**
             * If pagination metadata exists,
             * you can store total users here
             * (optional for UI pagination)
             */
            if (response.data?.total !== undefined) {
                // Example:
                // setTotalUsers(response.data.total);
            }

            setUsers(usersData);

        } catch (error) {

            console.error('Fetch Users Error:', error);

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Create User
     * ===============================
     */

    const handleCreateUser = async (values) => {

        try {

            await createUserApi(values);

            message.success('User created successfully!');

            /**
             * Refresh user list
             */
            fetchUsers();

            return true;

        } catch (error) {

            console.error('Create User Error:', error);

            return false;

        }

    };



    /**
     * ===============================
     * Update User
     * ===============================
     */

    const handleUpdateUser = async (id, values) => {

        try {

            await updateUserApi(id, values);

            message.success('User updated successfully!');

            /**
             * Refresh user list
             */
            fetchUsers();

            return true;

        } catch (error) {

            console.error('Update User Error:', error);

            return false;

        }

    };



    /**
     * ===============================
     * Delete User
     * ===============================
     */

    const handleDeleteUser = async (id) => {

        try {

            await deleteUserApi(id);

            message.success('User deleted successfully!');

            /**
             * Refresh user list
             */
            fetchUsers();

            return true;

        } catch (error) {

            console.error('Delete User Error:', error);

            return false;

        }

    };



    /**
     * ===============================
     * Auto Fetch Users on Mount
     * ===============================
     */

    useEffect(() => {

        fetchUsers();

    }, []);



    /**
     * ===============================
     * Hook Return API
     * ===============================
     */

    return {

        users,
        loading,

        fetchUsers,

        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser

    };

};