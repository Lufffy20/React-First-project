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
    const navigate = useNavigate();
    const location = useLocation();
    const { handleLogout } = useLogout();

    const userMenuItems = [
        { key: 'profile', label: 'My Profile', icon: <UserOutlined /> },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    // Some simple logic to change header content based on page if needed
    const isUsersPage = location.pathname === '/admin/users';

    return (
        <Header className="admin-header">
            <div className="header-left">
            </div>
            <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', backgroundColor: '#1890ff' }} />
                </Dropdown>
            </div>
        </Header>
    );
};

// AdminHeader component exported below
export default AdminHeader;
