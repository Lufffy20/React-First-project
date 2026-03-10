import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Typography, Rate } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MoreOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { useAdminReviews } from '../../../hooks/useAdminReviews';

import AddReview from './AddReview';
import EditReview from './EditReview';
import ViewReview from './ViewReview';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';
const VIEW_EDIT = 'edit';
const VIEW_DETAIL = 'detail';

const ManageReviews = () => {
    const { reviews, tours, loading, fetchReviews, handleAddReview, handleGetReview, handleUpdateReview, handleDeleteReview } = useAdminReviews();
    const [view, setView] = useState(VIEW_LIST);
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    // Navigation
    const goList = () => { setView(VIEW_LIST); setSelectedReview(null); };
    const goAdd = () => { setView(VIEW_ADD); setSelectedReview(null); };
    const goEdit = (review) => { setSelectedReview(review); setView(VIEW_EDIT); };
    const goDetail = async (review) => {
        const fresh = await handleGetReview(review.id);
        if (fresh?.data) {
            setSelectedReview({ ...fresh.data, tourTitle: review.tourTitle });
            setView(VIEW_DETAIL);
        }
    };

    // Handlers
    const handleAdd = async (values) => {
        const { tourId, ...data } = values;
        const result = await handleAddReview(tourId, data);
        if (result) { await fetchReviews(); goList(); }
    };

    const handleUpdate = async (values) => {
        const result = await handleUpdateReview(selectedReview.id, values);
        if (result) { await fetchReviews(); goList(); }
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteReview(id);
        if (result) { await fetchReviews(); goList(); }
    };

    // Sub-page rendering
    if (view === VIEW_ADD)
        return <AddReview tours={tours} loading={loading} onSave={handleAdd} onBack={goList} />;

    if (view === VIEW_EDIT && selectedReview)
        return <EditReview review={selectedReview} loading={loading} onSave={handleUpdate} onBack={goList} />;

    if (view === VIEW_DETAIL && selectedReview)
        return <ViewReview review={selectedReview} loading={loading} onEdit={goEdit} onDelete={handleDelete} onBack={goList} />;

    // List view
    const columns = [
        {
            title: '#',
            key: 'index',
            width: 55,
            render: (_, __, idx) => <Text type="secondary">{idx + 1}</Text>
        },
        {
            title: 'Reviewer',
            dataIndex: 'reviewer_name',
            key: 'reviewer_name',
            render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            render: (text) => text || <Text type="secondary">—</Text>
        },
        {
            title: 'Rating',
            dataIndex: 'overall_rating',
            key: 'overall_rating',
            render: (rating) => (
                <span>
                    <Rate disabled allowHalf defaultValue={rating || 0} style={{ fontSize: 14 }} />
                    <Text type="secondary" style={{ marginLeft: 6, fontSize: 12 }}>({rating || 0})</Text>
                </span>
            )
        },
        {
            title: 'Associated Tour',
            dataIndex: 'tourTitle',
            key: 'tourTitle',
            render: (title) => <Tag color="blue">{title}</Tag>
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_, record) => {
                const menuItems = [
                    {
                        key: 'view',
                        label: 'View',
                        icon: <EyeOutlined />,
                        onClick: () => goDetail(record)
                    },
                    {
                        key: 'edit',
                        label: 'Edit',
                        icon: <EditOutlined />,
                        onClick: () => goEdit(record)
                    },
                    { type: 'divider' },
                    {
                        key: 'delete',
                        label: (
                            <Popconfirm
                                title="Delete this review?"
                                description="This action cannot be undone."
                                onConfirm={() => handleDelete(record.id)}
                                okText="Yes, Delete"
                                cancelText="Cancel"
                                okButtonProps={{ danger: true }}
                            >
                                <span>Delete</span>
                            </Popconfirm>
                        ),
                        icon: <DeleteOutlined />,
                        danger: true
                    }
                ];

                return (
                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                        <Button icon={<MoreOutlined />} type="text" />
                    </Dropdown>
                );
            }
        }
    ];

    return (
        <div style={{ padding: 24 }}>
            <Card
                title={
                    <span>
                        <StarOutlined style={{ marginRight: 8 }} />
                        Review Management
                    </span>
                }
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={goAdd}>
                        Add Review
                    </Button>
                }
            >
                <Table
                    dataSource={reviews}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                        position: ['bottomCenter']
                    }}
                />
            </Card>
        </div>
    );
};

export default ManageReviews;
