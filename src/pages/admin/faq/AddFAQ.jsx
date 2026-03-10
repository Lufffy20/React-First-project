import React from 'react';
import { Card, Form, Input, Select, Button, Space, Divider, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AddFAQ = ({ tours, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        await onSave(values);
    };

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update FAQ</Title>
            </div>

            <Card>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
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
                        name="question"
                        label="Question"
                        rules={[{ required: true, message: 'Please enter the question' }]}
                    >
                        <Input placeholder="e.g. What is the best time to visit?" />
                    </Form.Item>

                    <Form.Item
                        name="answer"
                        label="Answer"
                        rules={[{ required: true, message: 'Please enter the answer' }]}
                    >
                        <Input.TextArea rows={5} placeholder="Provide a detailed answer..." />
                    </Form.Item>

                    <Divider />
                    <Space>
                        <Button onClick={onBack}>Cancel</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                            Save FAQ
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddFAQ;
