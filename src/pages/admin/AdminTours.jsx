import React, { useEffect } from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../hooks/useAdminTours';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AdminTours = () => {
    const { tours, loading, totalTours, fetchTours, handleDeleteTour } = useAdminTours();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current page and limit from URL, fallback to defaults
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('limit') || '5', 10);

    const handleAddTourClick = () => {
        navigate('/admin/tours/add');
    };

    // Effect to fetch tours whenever URL params change
    useEffect(() => {
        fetchTours({
            params: {
                page: currentPage,
                limit: pageSize
            }
        });
        // We only want this to run when currentPage or pageSize changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            render: (image) => (
                image ? <img src={image} alt="tour" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /> : 'No Image'
            )
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true
        },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Price ($)', dataIndex: 'price', key: 'price' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        {
            title: 'Featured',
            key: 'isFeatured',
            render: (_, record) => record.bestPrice || record.freeCancel ? <span style={{ color: 'green' }}>Yes</span> : 'No'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`/admin/tours/edit/${record.id}`)} size="small" />
                    <Popconfirm
                        title="Delete Tour"
                        description="Are you sure to delete this tour?"
                        onConfirm={() => handleDeleteTour(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger size="small" />
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <Card
            title="Tour Management"
            extra={
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTourClick}>
                    Add Tour
                </Button>
            }
            className="recent-activities-card"
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
                    placement: 'bottomCenter',
                    className: 'centered-pagination'
                }}
            />
        </Card>
    );
};
export default AdminTours;
