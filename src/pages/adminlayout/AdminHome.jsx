/**
 * AdminHome Component
 *
 * Purpose:
 * Admin dashboard overview page displaying key platform metrics
 * and recently added tours.
 *
 * Features:
 * - Shows statistics cards (Tours, Users, Revenue, Growth)
 * - Displays recent tours table
 * - Uses custom hooks for data fetching
 * - Integrates Ant Design UI components
 *
 * Data Sources:
 * - useUsers() → fetch total users
 * - useAdminTours() → fetch tours and total tours
 */

import React, { useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Button } from 'antd';
import {
    GlobalOutlined,
    TeamOutlined,
    RiseOutlined
} from '@ant-design/icons';

import { useUsers } from '../../hooks/useUsers';
import { useAdminTours } from '../../hooks/useAdminTours';



const AdminHome = () => {

    /**
     * Fetch users
     */
    const { users } = useUsers();

    /**
     * Fetch tours
     */
    const {
        tours,
        totalTours,
        loading: toursLoading,
        fetchTours
    } = useAdminTours();



    /**
     * Load tours on page mount
     */
    useEffect(() => {
        fetchTours();
    }, []);



    /**
     * Table columns for recent tours
     */
    const dashboardColumns = [

        {
            title: 'Tour Name',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <strong>{text}</strong>,
            ellipsis: true
        },

        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            ellipsis: true
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `$${price}`
        },

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type) => <Tag color="blue">{type}</Tag>
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    size="small"
                    onClick={() =>
                        window.location.href =
                        `/admin/tours/edit/${record.id}`
                    }
                >
                    Edit
                </Button>
            ),
        }

    ];



    return (

        <>

            {/* Dashboard Title */}
            <h2 className="dashboard-title">
                Admin Command Center
            </h2>



            {/* Statistic Cards */}
            <Row gutter={[24, 24]}>

                <Col xs={24} sm={12} lg={6}>
                    <Card
                        className="stat-card"
                        loading={toursLoading}
                    >
                        <Statistic
                            title="Total Tours"
                            value={totalTours}
                            prefix={<GlobalOutlined />}
                            styles={{
                                content: { color: '#3f8600' }
                            }}
                        />
                    </Card>
                </Col>



                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Total Users"
                            value={users.length}
                            prefix={<TeamOutlined />}
                            styles={{
                                content: { color: '#1890ff' }
                            }}
                        />
                    </Card>
                </Col>



                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Monthly Revenue"
                            value={8450}
                            precision={2}
                            prefix="$"
                            styles={{
                                content: { color: '#cf1322' }
                            }}
                        />
                    </Card>
                </Col>



                <Col xs={24} sm={12} lg={6}>
                    <Card className="stat-card">
                        <Statistic
                            title="Growth"
                            value={12.5}
                            precision={2}
                            prefix={<RiseOutlined />}
                            suffix="%"
                            styles={{
                                content: { color: '#3f8600' }
                            }}
                        />
                    </Card>
                </Col>

            </Row>



            {/* Recent Tours Table */}
            <Card
                title="Recent Added Tours"
                className="recent-activities-card"
            >

                <Table
                    dataSource={tours.slice(0, 5)}
                    columns={dashboardColumns}
                    pagination={false}
                    loading={toursLoading}
                    rowKey="id"
                />

            </Card>

        </>

    );

};



export default AdminHome;