/**
 * AdminSidebar Component
 *
 * Purpose:
 * Renders the left navigation sidebar for the Admin Panel.
 * It provides structured navigation links for different admin modules such as:
 * - Dashboard
 * - User Management
 * - Tour Management
 * - Inclusions / Exclusions
 * - FAQs
 * - Itinerary
 * - Gallery
 * - Reviews
 * - Settings
 *
 * Key Features:
 * - Built using Ant Design Layout and Menu components
 * - Supports collapsible sidebar behavior
 * - Automatically highlights the active menu item based on the current route
 * - Uses React Router for navigation between admin pages
 *
 * Notes:
 * - The sidebar state (collapsed/expanded) is controlled by the parent layout
 * - The active menu item is calculated using the current URL path
 * - Navigation is handled programmatically using `useNavigate`
 */

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
    PictureOutlined,
    StarOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = ({ collapsed, setCollapsed }) => {

    /**
     * React Router hooks
     * - navigate: used to redirect user when clicking menu items
     * - location: used to determine the current active route
     */
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Determine which menu item should be active
     * based on the current URL path.
     * This prevents UI flickering when the page refreshes.
     */
    const getActiveKey = (path) => {
        if (path === '/admin/dashboard') return '1';
        if (path === '/admin/users') return '2';
        if (path === '/admin/tours') return '3';
        if (path === '/admin/inclusions') return '4';
        if (path === '/admin/exclusions') return '5';
        if (path === '/admin/faqs') return '6';
        if (path === '/admin/itinerary') return '7';
        if (path === '/admin/gallery') return '8';
        if (path === '/admin/reviews') return '10';
        if (path === '/admin/settings') return '9';

        // Default fallback
        return '1';
    };

    /**
     * Selected menu key derived from current route
     */
    const selectedKey = getActiveKey(location.pathname);

    /**
     * Menu click handler
     * Navigates to the appropriate admin route
     * based on the clicked menu item key.
     */
    const handleMenuClick = (e) => {

        if (e.key === '1') navigate('/admin/dashboard');
        else if (e.key === '2') navigate('/admin/users');
        else if (e.key === '3') navigate('/admin/tours');
        else if (e.key === '4') navigate('/admin/inclusions');
        else if (e.key === '5') navigate('/admin/exclusions');
        else if (e.key === '6') navigate('/admin/faqs');
        else if (e.key === '7') navigate('/admin/itinerary');
        else if (e.key === '8') navigate('/admin/gallery');
        else if (e.key === '10') navigate('/admin/reviews');
        else if (e.key === '9') navigate('/admin/settings');

    };

    /**
     * Sidebar Menu Configuration
     * Each item contains:
     * - unique key
     * - icon
     * - label text
     */
    const menuItems = [
        { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
        { key: '2', icon: <TeamOutlined />, label: 'Users' },
        { key: '3', icon: <GlobalOutlined />, label: 'Manage Tours' },
        { key: '4', icon: <CheckCircleOutlined />, label: 'Inclusions' },
        { key: '5', icon: <CloseCircleOutlined />, label: 'Exclusions' },
        { key: '6', icon: <QuestionCircleOutlined />, label: 'FAQs' },
        { key: '7', icon: <ClockCircleOutlined />, label: 'Itinerary' },
        { key: '8', icon: <PictureOutlined />, label: 'Manage Gallery' },
        { key: '10', icon: <StarOutlined />, label: 'Reviews' },
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

            {/* ==============================
               Logo Section
            ============================== */}
            <div className="logo-container">
                <div className="logo-text">
                    {collapsed ? 'A' : 'ANNAIZU'}
                </div>
            </div>

            {/* ==============================
               Navigation Menu
            ============================== */}
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

/**
 * Export AdminSidebar Component
 */
export default AdminSidebar;