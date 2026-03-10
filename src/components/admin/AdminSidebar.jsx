import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    GlobalOutlined,
    SettingOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    QuestionCircleOutlined,
    ClockCircleOutlined,
    DollarCircleOutlined,
    PictureOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initial key calculation to prevent flicker on refresh
    const getActiveKey = (path) => {
        if (path === '/admin/dashboard') return '1';
        if (path === '/admin/users') return '2';
        if (path === '/admin/tours') return '3';
        if (path === '/admin/inclusions') return '4';
        if (path === '/admin/exclusions') return '5';
        if (path === '/admin/faqs') return '6';
        if (path === '/admin/itinerary') return '7';
        if (path === '/admin/gallery') return '8';
        if (path === '/admin/settings') return '9';
        return '1';
    };

    const selectedKey = getActiveKey(location.pathname);

    const handleMenuClick = (e) => {
        if (e.key === '1') navigate('/admin/dashboard');
        else if (e.key === '2') navigate('/admin/users');
        else if (e.key === '3') navigate('/admin/tours');
        else if (e.key === '4') navigate('/admin/inclusions');
        else if (e.key === '5') navigate('/admin/exclusions');
        else if (e.key === '6') navigate('/admin/faqs');
        else if (e.key === '7') navigate('/admin/itinerary');
        else if (e.key === '8') navigate('/admin/gallery');
        else if (e.key === '9') navigate('/admin/settings');
    };

    const menuItems = [
        { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '2', icon: <TeamOutlined />, label: 'Users' },
        { key: '3', icon: <GlobalOutlined />, label: 'Manage Tours' },
        { key: '4', icon: <CheckCircleOutlined />, label: 'Inclusions' },
        { key: '5', icon: <CloseCircleOutlined />, label: 'Exclusions' },
        { key: '6', icon: <QuestionCircleOutlined />, label: 'FAQs' },
        { key: '7', icon: <ClockCircleOutlined />, label: 'Itinerary' },
        { key: '8', icon: <PictureOutlined />, label: 'Manage Gallery' },
        { key: '9', icon: <SettingOutlined />, label: 'Settings' },
    ];

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            className="admin-sider"
            theme="dark"
        >
            <div className="logo-container">
                <div className="logo-text">{collapsed ? 'A' : 'ANNAIZU'}</div>
            </div>
            <Menu
                theme="dark"
                selectedKeys={[selectedKey]}
                mode="inline"
                onClick={handleMenuClick}
                items={menuItems}
            />
        </Sider>
    );
};

export default AdminSidebar;
