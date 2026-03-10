import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Space, Divider, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditExclusion = ({ exclusion, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (exclusion) {
            form.setFieldsValue({
                item: exclusion.item
            });
        }
    }, [exclusion]);

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update Exclusion</Title>
            </div>

            <Card style={{ maxWidth: 680 }}>
                <Form form={form} layout="vertical" onFinish={onSave}>
                    <Form.Item label="Associated Tour">
                        <Tag color="volcano">{exclusion?.tourTitle}</Tag>
                    </Form.Item>

                    <Form.Item
                        name="item"
                        label="Exclusion Item"
                        rules={[{ required: true, message: 'Please enter the exclusion' }]}
                    >
                        <Input.TextArea rows={3} placeholder="e.g. Any personal expenses" />
                    </Form.Item>

                    <Divider />
                    <Space>
                        <Button onClick={onBack}>Cancel</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                            Update Exclusion
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default EditExclusion;
