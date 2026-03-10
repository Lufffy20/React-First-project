import React from 'react';
import { Card, Descriptions, Button, Space, Divider, Popconfirm, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ViewExclusion = ({ exclusion, loading, onEdit, onDelete, onBack }) => {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Exclusion Details</Title>
            </div>

            <Card style={{ maxWidth: 680 }}>
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Associated Tour">
                        <Tag color="volcano">{exclusion?.tourTitle}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Exclusion Item">
                        {exclusion?.item}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />
                <Space>
                    <Button onClick={onBack} icon={<ArrowLeftOutlined />}>Back</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(exclusion)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this exclusion?"
                        onConfirm={() => onDelete(exclusion?.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<DeleteOutlined />} loading={loading}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            </Card>
        </div>
    );
};

export default ViewExclusion;
