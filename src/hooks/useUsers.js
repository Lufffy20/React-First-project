import { useState, useEffect } from 'react';
import { getUsersApi, createUserApi, updateUserApi, deleteUserApi } from '../helper/functionapi';
import { message } from 'antd';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsersApi();
            setUsers(response.data);
        } catch (error) {
            console.error('Fetch Users Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (values) => {
        try {
            await createUserApi(values);
            message.success('User created successfully!');
            fetchUsers();
            return true;
        } catch (error) {
            console.error('Create User Error:', error);
            return false;
        }
    };

    const handleUpdateUser = async (id, values) => {
        try {
            await updateUserApi(id, values);
            message.success('User updated successfully!');
            fetchUsers();
            return true;
        } catch (error) {
            console.error('Update User Error:', error);
            return false;
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUserApi(id);
            message.success('User deleted successfully!');
            fetchUsers();
            return true;
        } catch (error) {
            console.error('Delete User Error:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        fetchUsers,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser
    };
};
