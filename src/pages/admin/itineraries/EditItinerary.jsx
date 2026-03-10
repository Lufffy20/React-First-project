import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Space, Divider, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditItinerary = ({ itinerary, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (itinerary) {
            form.setFieldsValue(itinerary);
        }
    }, [itinerary]);

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update Itinerary Day</Title>
            </div>

            <Card style={{ maxWidth: 800 }}>
                <Form form={form} layout="vertical" onFinish={onSave}>
                    <Form.Item label="Associated Tour">
                        <Tag color="blue">{itinerary?.tourTitle}</Tag>
                    </Form.Item>

                    <Form.Item
                        name="day_number"
                        label="Day Number"
                        rules={[{ required: true, message: 'Please enter the day number' }]}
                    >
                        <Input type="number" placeholder="e.g. 1" />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Day Title"
                        rules={[{ required: true, message: 'Enter a title for this day' }]}
                    >
                        <Input placeholder="e.g. Arrival and City Exploration" />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Time / Subtitle"
                    >
                        <Input placeholder="e.g. 09:00 AM or Morning Session" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Activities Description"
                        rules={[{ required: true, message: 'Please describe the activities' }]}
                    >
                        <Input.TextArea rows={6} placeholder="Describe the day's plan in detail..." />
                    </Form.Item>

                    <Divider />
                    <Space>
                        <Button onClick={onBack}>Cancel</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                            Update Itinerary Day
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default EditItinerary;
