import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MoreOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';

import AddExclusion from './AddExclusion';
import EditExclusion from './EditExclusion';
import ViewExclusion from './ViewExclusion';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';
const VIEW_EDIT = 'edit';
const VIEW_DETAIL = 'detail';

const ManageExclusions = () => {
    const { tours, loading, fetchTours, handleAddExclusion, handleUpdateExclusion, handleDeleteExclusion, handleGetExclusion } = useAdminTours();
    const [view, setView] = useState(VIEW_LIST);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchTours({ params: { limit: 100 } });
    }, []);

    const allExclusions = tours.flatMap(tour =>
        (tour.exclusions || []).map(exc => ({
            ...exc,
            tourId: tour.id,
            tourTitle: tour.title
        }))
    );

    const goList = () => { setView(VIEW_LIST); setSelectedItem(null); };
    const goAdd = () => { setView(VIEW_ADD); setSelectedItem(null); };
    const goEdit = (item) => { setSelectedItem(item); setView(VIEW_EDIT); };
    const goDetail = async (item) => {
        const fresh = await handleGetExclusion(item.id);
        if (fresh) {
            setSelectedItem({ ...fresh, tourTitle: item.tourTitle });
            setView(VIEW_DETAIL);
        }
    };

    const handleAdd = async (values) => {
        const result = await handleAddExclusion(values.tourId, { item: values.item });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleUpdate = async (values) => {
        const result = await handleUpdateExclusion(selectedItem.id, { item: values.item });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteExclusion(id);
        if (result) { await fetchTours({ params: { limit: 100 } }); if (view !== VIEW_LIST) goList(); }
    };

    if (view === VIEW_ADD) return <AddExclusion tours={tours} loading={loading} onSave={handleAdd} onBack={goList} />;
    if (view === VIEW_EDIT) return <EditExclusion exclusion={selectedItem} loading={loading} onSave={handleUpdate} onBack={goList} />;
    if (view === VIEW_DETAIL) return <ViewExclusion exclusion={selectedItem} loading={loading} onEdit={goEdit} onDelete={handleDelete} onBack={goList} />;

    const columns = [
        { title: '#', key: 'index', width: 55, render: (_, __, idx) => <Text type="secondary">{idx + 1}</Text> },
        {
            title: 'Exclusion',
            dataIndex: 'item',
            key: 'item',
            render: (text) => (
                <span>
                    <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
                    {text}
                </span>
            )
        },
        { title: 'Associated Tour', dataIndex: 'tourTitle', key: 'tourTitle', render: (title) => <Tag color="volcano">{title}</Tag> },
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
                            <Popconfirm title="Delete this exclusion?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No" okButtonProps={{ danger: true }}>
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
                title={<span><CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />Exclusions Management</span>}
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={goAdd}>Add Exclusion</Button>}
            >
                <Table dataSource={allExclusions} columns={columns} loading={loading} rowKey="id" pagination={{ pageSize: 10, showSizeChanger: true, position: ['bottomCenter'] }} />
            </Card>
        </div>
    );
};

export default ManageExclusions;
