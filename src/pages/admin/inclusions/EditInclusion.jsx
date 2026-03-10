import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Space, Divider, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditInclusion = ({ inclusion, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (inclusion) {
            form.setFieldsValue({
                item: inclusion.item
            });
        }
    }, [inclusion]);

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update Inclusion</Title>
            </div>

            <Card style={{ maxWidth: 680 }}>
                <Form form={form} layout="vertical" onFinish={onSave}>
                    <Form.Item label="Associated Tour">
                        <Tag color="green">{inclusion?.tourTitle}</Tag>
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
                            Update Inclusion
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default EditInclusion;
