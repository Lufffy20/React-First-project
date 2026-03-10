import React from 'react';
import { Card, Descriptions, Button, Space, Divider, Popconfirm, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ViewItinerary = ({ itinerary, loading, onEdit, onDelete, onBack }) => {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Itinerary Day Details</Title>
            </div>

            <Card style={{ maxWidth: 800 }}>
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Associated Tour">
                        <Tag color="blue">{itinerary?.tourTitle}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Day Title">
                        <Text strong>{itinerary?.title}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Time / Subtitle">
                        {itinerary?.time || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Activities Description">
                        <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{itinerary?.description}</Paragraph>
                    </Descriptions.Item>
                </Descriptions>

                <Divider />
                <Space>
                    <Button onClick={onBack} icon={<ArrowLeftOutlined />}>Back</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(itinerary)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this itinerary day?"
                        onConfirm={() => onDelete(itinerary?.id)}
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

import { Typography as AntTypography } from 'antd';
const { Text } = AntTypography;

export default ViewItinerary;
