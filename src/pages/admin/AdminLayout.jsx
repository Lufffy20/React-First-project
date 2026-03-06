import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import './AdminDashboard.css';

const { Content, Footer } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="admin-layout">
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <Layout>
                <AdminHeader />

                <Content className="admin-content">
                    <Outlet />
                </Content>

                <Footer className="admin-footer">
                    Annaizu Admin Panel ©2025 Created by Your Team
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
