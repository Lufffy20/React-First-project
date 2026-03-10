import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Space, Divider, Tag, Typography } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditFAQ = ({ faq, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (faq) {
            form.setFieldsValue({
                question: faq.question,
                answer: faq.answer
            });
        }
    }, [faq]);

    const handleFinish = async (values) => {
        await onSave(values);
    };

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Update FAQ</Title>
            </div>

            <Card style={{ maxWidth: 680 }}>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item label="Associated Tour">
                        <Tag color="blue" style={{ fontSize: 14, padding: '4px 10px' }}>
                            {faq?.tourTitle}
                        </Tag>
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
                            Update FAQ
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default EditFAQ;
