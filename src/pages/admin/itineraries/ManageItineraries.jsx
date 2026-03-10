import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MoreOutlined, ClockCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';

import AddItinerary from './AddItinerary';
import EditItinerary from './EditItinerary';
import ViewItinerary from './ViewItinerary';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';
const VIEW_EDIT = 'edit';
const VIEW_DETAIL = 'detail';

const ManageItineraries = () => {
    const { tours, loading, fetchTours, handleAddItinerary, handleUpdateItinerary, handleDeleteItinerary, handleGetItinerary } = useAdminTours();
    const [view, setView] = useState(VIEW_LIST);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchTours({ params: { limit: 100 } });
    }, []);

    const allItineraries = tours.flatMap(tour =>
        (tour.itineraries || []).map(item => ({
            ...item,
            tourId: tour.id,
            tourTitle: tour.title
        }))
    );

    const goList = () => { setView(VIEW_LIST); setSelectedItem(null); };
    const goAdd = () => { setView(VIEW_ADD); setSelectedItem(null); };
    const goEdit = (item) => { setSelectedItem(item); setView(VIEW_EDIT); };
    const goDetail = async (item) => {
        const fresh = await handleGetItinerary(item.id);
        if (fresh) {
            setSelectedItem({ ...fresh, tourTitle: item.tourTitle });
            setView(VIEW_DETAIL);
        }
    };

    const handleAdd = async (values) => {
        const result = await handleAddItinerary(values.tourId, values);
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleUpdate = async (values) => {
        const result = await handleUpdateItinerary(selectedItem.id, values);
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteItinerary(id);
        if (result) { await fetchTours({ params: { limit: 100 } }); if (view !== VIEW_LIST) goList(); }
    };

    if (view === VIEW_ADD) return <AddItinerary tours={tours} loading={loading} onSave={handleAdd} onBack={goList} />;
    if (view === VIEW_EDIT) return <EditItinerary itinerary={selectedItem} loading={loading} onSave={handleUpdate} onBack={goList} />;
    if (view === VIEW_DETAIL) return <ViewItinerary itinerary={selectedItem} loading={loading} onEdit={goEdit} onDelete={handleDelete} onBack={goList} />;

    const columns = [
        { title: '#', key: 'index', width: 55, render: (_, __, idx) => <Text type="secondary">{idx + 1}</Text> },
        {
            title: 'Day Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <Text strong>{text}</Text>
        },
        {
            title: 'Time/Subtitle',
            dataIndex: 'time',
            key: 'time',
            render: (text) => (
                <span>
                    <ClockCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    {text || <Text type="secondary">Not Set</Text>}
                </span>
            )
        },
        { title: 'Associated Tour', dataIndex: 'tourTitle', key: 'tourTitle', render: (title) => <Tag color="blue">{title}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_, record) => {
                const menuItems = [
                    { key: 'view', label: 'View', icon: <EyeOutlined />, onClick: () => goDetail(record) },
                    { key: 'edit', label: 'Update', icon: <EditOutlined />, onClick: () => goEdit(record) },
                    { type: 'divider' },
                    {
                        key: 'delete',
                        label: (
                            <Popconfirm title="Delete this day?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No" okButtonProps={{ danger: true }}>
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
                title={<span><ClockCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />Itinerary Management</span>}
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={goAdd}>Add Day</Button>}
            >
                <Table
                    dataSource={allItineraries}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{ pageSize: 10, showSizeChanger: true, position: ['bottomCenter'] }}
                />
            </Card>
        </div>
    );
};

export default ManageItineraries;
