import React from 'react';
import { Card, Descriptions, Button, Space, Divider, Popconfirm, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ViewFAQ = ({ faq, loading, onEdit, onDelete, onBack }) => {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>FAQ Details</Title>
            </div>

            <Card style={{ maxWidth: 680 }}>
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Associated Tour">
                        <Tag color="blue">{faq?.tourTitle}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Question">
                        <span style={{ fontWeight: 500 }}>{faq?.question}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Answer">
                        {faq?.answer}
                    </Descriptions.Item>
                </Descriptions>

                <Divider />
                <Space>
                    <Button onClick={onBack} icon={<ArrowLeftOutlined />}>Back</Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(faq)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this FAQ?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(faq?.id)}
                        okText="Yes, Delete"
                        cancelText="Cancel"
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

export default ViewFAQ;
