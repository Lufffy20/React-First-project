/**
 * AdminHeader Component
 *
 * Purpose:
 * Renders the top navigation header for the Admin Panel.
 * It provides quick access to:
 * - Notifications
 * - User profile menu
 * - Logout functionality
 *
 * Key Features:
 * - Uses Ant Design Layout components
 * - Integrates with React Router for navigation awareness
 * - Displays a dropdown menu for user actions
 * - Handles logout through a custom authentication hook
 *
 * Notes:
 * - The component checks the current route using useLocation.
 * - Profile and logout options are displayed through an Ant Design Dropdown menu.
 * - Logout logic is delegated to the custom hook `useLogout`.
 */

import React from 'react';
import { Layout, Button, Avatar, Dropdown } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

import { LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '../../hooks/useAuth';

const AdminHeader = () => {

    /**
     * React Router Hooks
     * - navigate: used to redirect users programmatically
     * - location: provides information about the current URL
     */
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Custom Auth Hook
     * Provides logout handler for admin session
     */
    const { handleLogout } = useLogout();

    /**
     * Dropdown Menu Items
     * These are the options shown when clicking the user avatar
     */
    const userMenuItems = [
        {
            key: 'profile',
            label: 'My Profile',
            icon: <UserOutlined />
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    /**
     * Example Page Detection Logic
     * This can be used to conditionally render header content
     * depending on the current admin page.
     */
    const isUsersPage = location.pathname === '/admin/users';

    return (
        <Header className="admin-header">

            {/* Left Section of Header */}
            <div className="header-left">
                {/* Reserved for future features such as breadcrumbs or page titles */}
            </div>

            {/* Right Section of Header */}
            <div
                className="header-right"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >

                {/* Notification Icon */}
                <BellOutlined
                    style={{
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                />

                {/* User Avatar with Dropdown Menu */}
                <Dropdown
                    menu={{ items: userMenuItems }}
                    placement="bottomRight"
                >
                    <Avatar
                        icon={<UserOutlined />}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#1890ff'
                        }}
                    />
                </Dropdown>

            </div>

        </Header>
    );
};

/**
 * Export AdminHeader component
 * Used inside Admin Layout
 */
export default AdminHeader;