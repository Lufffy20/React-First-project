import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, Tag, Dropdown, Image, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, MoreOutlined, PictureOutlined } from '@ant-design/icons';
import { useAdminTours } from '../../../hooks/useAdminTours';

import AddGalleryImages from './AddGalleryImages';

const { Text } = Typography;

const VIEW_LIST = 'list';
const VIEW_ADD = 'add';

const ManageGallery = () => {
    const { tours, loading, fetchTours, handleAddImage, handleDeleteImage } = useAdminTours();
    const [view, setView] = useState(VIEW_LIST);

    useEffect(() => {
        fetchTours({ params: { limit: 100 } });
    }, []);

    const allGalleryImages = tours.flatMap(tour =>
        (tour.gallery || []).map(img => ({
            ...img,
            tourId: tour.id,
            tourTitle: tour.title
        }))
    );

    const goList = () => setView(VIEW_LIST);
    const goAdd = () => setView(VIEW_ADD);

    const handleUpload = async (tourId, fileList) => {
        let successAll = true;
        for (const file of fileList) {
            const formData = new FormData();
            formData.append('image', file.originFileObj);
            const res = await handleAddImage(tourId, formData);
            if (!res) successAll = false;
        }
        if (successAll) {
            await fetchTours({ params: { limit: 100 } });
            goList();
        }
    };

    const handleDelete = async (id) => {
        const res = await handleDeleteImage(id);
        if (res) fetchTours({ params: { limit: 100 } });
    };

    if (view === VIEW_ADD) return <AddGalleryImages tours={tours} loading={loading} onSave={handleUpload} onBack={goList} />;

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image_url',
            key: 'image_url',
            width: 110,
            render: (url) => (
                <Image
                    src={`http://localhost:1337${url}`}
                    alt="Gallery"
                    width={70}
                    height={55}
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                />
            )
        },
        {
            title: 'Associated Tour',
            dataIndex: 'tourTitle',
            key: 'tourTitle',
            render: (title) => (
                <Tag color="cyan">{title}</Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 80,
            align: 'center',
            render: (_, record) => {
                const menuItems = [
                    {
                        key: 'delete',
                        label: (
                            <Popconfirm
                                title="Delete this image?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Yes"
                                cancelText="No"
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
        },
    ];

    return (
        <div className="admin-form-container">
            <Card
                title={
                    <span>
                        <PictureOutlined style={{ color: '#13c2c2', marginRight: 8 }} />
                        Gallery Management
                    </span>
                }
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={goAdd}
                    >
                        Add Images
                    </Button>
                }
            >
                <Table
                    dataSource={allGalleryImages}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        position: ['bottomCenter']
                    }}
                />
            </Card>
        </div>
    );
};

export default ManageGallery;
