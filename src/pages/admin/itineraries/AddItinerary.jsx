import React from 'react';
import { Card, Form, Input, Select, Button, Space, Divider, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AddItinerary = ({ tours, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update Itinerary Day</Title>
            </div>

            <Card>
                <Form form={form} layout="vertical" onFinish={onSave}>
                    <Form.Item
                        name="tourId"
                        label="Select Tour"
                        rules={[{ required: true, message: 'Please select a tour' }]}
                    >
                        <Select
                            placeholder="Choose a tour"
                            showSearch
                            optionFilterProp="children"
                            loading={loading}
                        >
                            {tours.map(t => (
                                <Select.Option key={t.id} value={t.id}>{t.title}</Select.Option>
                            ))}
                        </Select>
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
                            Save Itinerary Day
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddItinerary;
