import React from 'react';
import { Card, Form, Input, Select, Button, Space, Divider, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AddInclusion = ({ tours, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update Inclusion</Title>
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
                        name="item"
                        label="Inclusion Item"
                        rules={[{ required: true, message: 'Please enter the inclusion' }]}
                    >
                        <Input.TextArea rows={3} placeholder="e.g. All entrance fees included" />
                    </Form.Item>

                    <Divider />
                    <Space>
                        <Button onClick={onBack}>Cancel</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                            Save Inclusion
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddInclusion;
