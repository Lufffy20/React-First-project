import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminTours = () => {

    const { tours, loading, totalTours, fetchTours, handleDeleteTour } = useAdminTours();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('limit') || '5', 10);

    const handleAddTourClick = () => {
        navigate('/admin/tours/add');
    };

    useEffect(() => {
        fetchTours({
            params: {
                page: currentPage,
                limit: pageSize
            }
        });
    }, [currentPage, pageSize]);

    const handleTableChange = (pagination) => {
        setSearchParams({
            page: pagination.current.toString(),
            limit: pagination.pageSize.toString()
        });
    };

    const tourColumns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) =>
                image ? (
                    <img
                        src={image}
                        alt="tour"
                        style={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 6
                        }}
                    />
                ) : 'No Image'
        },

        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },

        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
        },

        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price'
        },

        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type'
        },

        {
            title: 'Featured',
            key: 'isFeatured',
            render: (_, record) =>
                record.bestPrice || record.freeCancel
                    ? <span style={{ color: 'green' }}>Yes</span>
                    : 'No'
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {

                const items = [
                    {
                        key: 'view',
                        label: 'View',
                        icon: <EyeOutlined />,
                        onClick: () => navigate(`/admin/tours/view/${record.id}`)
                    },
                    {
                        key: 'edit',
                        label: 'Edit',
                        icon: <EditOutlined />,
                        onClick: () => navigate(`/admin/tours/edit/${record.id}`)
                    },
                    {
                        key: 'delete',
                        label: (
                            <Popconfirm
                                title="Delete Tour"
                                description="Are you sure to delete this tour?"
                                onConfirm={() => handleDeleteTour(record.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                Delete
                            </Popconfirm>
                        ),
                        icon: <DeleteOutlined />,
                        danger: true
                    }
                ];

                return (
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                    >
                        <Button
                            icon={<MoreOutlined />}
                            type="text"
                        />
                    </Dropdown>
                );
            }
        }
    ];

    return (
        <Card
            title="Tour Management"
            extra={
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddTourClick}
                >
                    Add Tour
                </Button>
            }
        >
            <Table
                dataSource={tours}
                columns={tourColumns}
                loading={loading}
                rowKey="id"
                onChange={handleTableChange}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalTours,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                    position: ['bottomCenter']
                }}
            />
        </Card>
    );
};

export default AdminTours;