import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MoreOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';

import AddInclusion from './AddInclusion';
import EditInclusion from './EditInclusion';
import ViewInclusion from './ViewInclusion';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';
const VIEW_EDIT = 'edit';
const VIEW_DETAIL = 'detail';

const ManageInclusions = () => {
    const { tours, loading, fetchTours, handleAddInclusion, handleUpdateInclusion, handleDeleteInclusion, handleGetInclusion } = useAdminTours();
    const [view, setView] = useState(VIEW_LIST);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchTours({ params: { limit: 100 } });
    }, []);

    const allInclusions = tours.flatMap(tour =>
        (tour.inclusions || []).map(inc => ({
            ...inc,
            tourId: tour.id,
            tourTitle: tour.title
        }))
    );

    const goList = () => { setView(VIEW_LIST); setSelectedItem(null); };
    const goAdd = () => { setView(VIEW_ADD); setSelectedItem(null); };
    const goEdit = (item) => { setSelectedItem(item); setView(VIEW_EDIT); };
    const goDetail = async (item) => {
        const fresh = await handleGetInclusion(item.id);
        if (fresh) {
            setSelectedItem({ ...fresh, tourTitle: item.tourTitle });
            setView(VIEW_DETAIL);
        }
    };

    const handleAdd = async (values) => {
        const result = await handleAddInclusion(values.tourId, { item: values.item });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleUpdate = async (values) => {
        const result = await handleUpdateInclusion(selectedItem.id, { item: values.item });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteInclusion(id);
        if (result) { await fetchTours({ params: { limit: 100 } }); if (view !== VIEW_LIST) goList(); }
    };

    if (view === VIEW_ADD) return <AddInclusion tours={tours} loading={loading} onSave={handleAdd} onBack={goList} />;
    if (view === VIEW_EDIT) return <EditInclusion inclusion={selectedItem} loading={loading} onSave={handleUpdate} onBack={goList} />;
    if (view === VIEW_DETAIL) return <ViewInclusion inclusion={selectedItem} loading={loading} onEdit={goEdit} onDelete={handleDelete} onBack={goList} />;

    const columns = [
        { title: '#', key: 'index', width: 55, render: (_, __, idx) => <Text type="secondary">{idx + 1}</Text> },
        {
            title: 'Inclusion',
            dataIndex: 'item',
            key: 'item',
            render: (text) => (
                <span>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    {text}
                </span>
            )
        },
        { title: 'Associated Tour', dataIndex: 'tourTitle', key: 'tourTitle', render: (title) => <Tag color="green">{title}</Tag> },
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
                            <Popconfirm title="Delete this inclusion?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No" okButtonProps={{ danger: true }}>
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
                title={<span><CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />Inclusions Management</span>}
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={goAdd}>Add Inclusion</Button>}
            >
                <Table dataSource={allInclusions} columns={columns} loading={loading} rowKey="id" pagination={{ pageSize: 10, showSizeChanger: true, position: ['bottomCenter'] }} />
            </Card>
        </div>
    );
};

export default ManageInclusions;
