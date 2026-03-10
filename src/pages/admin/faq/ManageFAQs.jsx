import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, MoreOutlined, QuestionCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';

import AddFAQ from './AddFAQ';
import EditFAQ from './EditFAQ';
import ViewFAQ from './ViewFAQ';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';
const VIEW_EDIT = 'edit';
const VIEW_DETAIL = 'detail';

const ManageFAQs = () => {
    const { tours, loading, fetchTours, handleAddFaq, handleUpdateFaq, handleDeleteFaq, handleGetFaq } = useAdminTours();
    const [view, setView] = useState(VIEW_LIST);
    const [selectedFaq, setSelectedFaq] = useState(null);

    useEffect(() => {
        fetchTours({ params: { limit: 100 } });
    }, []);

    const allFaqs = tours.flatMap(tour =>
        (tour.faqs || []).map(faq => ({
            ...faq,
            tourId: tour.id,
            tourTitle: tour.title
        }))
    );

    // ─── Navigation ─────────────────────────────────────────────────────────
    const goList = () => { setView(VIEW_LIST); setSelectedFaq(null); };
    const goAdd = () => { setView(VIEW_ADD); setSelectedFaq(null); };
    const goEdit = (faq) => { setSelectedFaq(faq); setView(VIEW_EDIT); };
    const goDetail = async (faq) => {
        const freshFaq = await handleGetFaq(faq.id);
        if (freshFaq) {
            setSelectedFaq({
                ...freshFaq,
                tourTitle: faq.tourTitle // Keeping tourTitle from list as it might not be in single FAQ response
            });
            setView(VIEW_DETAIL);
        }
    };

    // ─── API Handlers ────────────────────────────────────────────────────────
    const handleAdd = async (values) => {
        const result = await handleAddFaq(values.tourId, { question: values.question, answer: values.answer });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleUpdate = async (values) => {
        const result = await handleUpdateFaq(selectedFaq.id, { question: values.question, answer: values.answer });
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    const handleDelete = async (id) => {
        const result = await handleDeleteFaq(id);
        if (result) { await fetchTours({ params: { limit: 100 } }); goList(); }
    };

    // ─── Render sub-pages ────────────────────────────────────────────────────
    if (view === VIEW_ADD)
        return <AddFAQ tours={tours} loading={loading} onSave={handleAdd} onBack={goList} />;

    if (view === VIEW_EDIT)
        return <EditFAQ faq={selectedFaq} loading={loading} onSave={handleUpdate} onBack={goList} />;

    if (view === VIEW_DETAIL && selectedFaq)
        return <ViewFAQ faq={selectedFaq} loading={loading} onEdit={goEdit} onDelete={handleDelete} onBack={goList} />;

    // ─── List View ───────────────────────────────────────────────────────────
    const columns = [
        {
            title: '#',
            key: 'index',
            width: 55,
            render: (_, __, idx) => <Text type="secondary">{idx + 1}</Text>
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            ellipsis: true,
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>
        },
        {
            title: 'Answer',
            dataIndex: 'answer',
            key: 'answer',
            ellipsis: true,
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
                        label: 'Update',
                        icon: <EditOutlined />,
                        onClick: () => goEdit(record)
                    },
                    { type: 'divider' },
                    {
                        key: 'delete',
                        label: (
                            <Popconfirm
                                title="Delete this FAQ?"
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
                        <QuestionCircleOutlined style={{ marginRight: 8 }} />
                        FAQ Management
                    </span>
                }
                extra={
                    <Button type="primary" icon={<PlusOutlined />} onClick={goAdd}>
                        Add FAQ
                    </Button>
                }
            >
                <Table
                    dataSource={allFaqs}
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

export default ManageFAQs;
