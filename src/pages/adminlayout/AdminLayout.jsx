/**
 * AdminLayout Component
 *
 * Purpose:
 * This component provides the **main layout structure for the Admin Panel**.
 * It includes the sidebar navigation, header, main content area, and footer.
 *
 * Features:
 * - Collapsible sidebar for navigation
 * - Admin header for actions (profile, notifications, logout)
 * - Dynamic content rendering using React Router's <Outlet />
 * - Footer section for branding or copyright
 *
 * Layout Structure:
 *
 * AdminLayout
 * ├── AdminSidebar
 * ├── AdminHeader
 * ├── Content (Outlet renders child routes here)
 * └── Footer
 */

import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

import './AdminDashboard.css';

const { Content, Footer } = Layout;

const AdminLayout = () => {

    /**
     * Sidebar collapsed state
     * Controls whether sidebar is expanded or minimized
     */
    const [collapsed, setCollapsed] = useState(false);

    return (

        <Layout className="admin-layout">

            {/* Sidebar Navigation */}
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <Layout>

                {/* Top Header */}
                <AdminHeader />

                {/* Main Page Content */}
                <Content className="admin-content">
                    <Outlet />
                </Content>

                {/* Footer */}
                <Footer className="admin-footer">
                    Annaizu Admin Panel ©2025 Created by Your Team
                </Footer>

            </Layout>

        </Layout>

    );

};

export default AdminLayout;