import React from 'react';
import { Card, Form, Input, Select, Button, Space, Divider, Typography, Row, Col } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AddReview = ({ tours, loading, onSave, onBack }) => {
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        await onSave(values);
    };

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>Add Review</Title>
            </div>

            <Card>
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    {/* Tour Selection */}
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

                    {/* Reviewer Info */}
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="reviewer_name"
                                label="Reviewer Name"
                                rules={[{ required: true, message: 'Please enter reviewer name' }]}
                            >
                                <Input placeholder="e.g. John Doe" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="reviewer_email"
                                label="Reviewer Email"
                                rules={[
                                    { required: true, message: 'Please enter reviewer email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input placeholder="e.g. john@example.com" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item name="title" label="Review Title">
                        <Input placeholder="e.g. Amazing experience!" />
                    </Form.Item>

                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ required: true, message: 'Please enter a comment' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Write the review comment..." />
                    </Form.Item>

                    <Divider>Ratings (1–5)</Divider>

                    <Row gutter={16}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_location"
                                label="Location"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_amenities"
                                label="Amenities"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_food"
                                label="Food"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_room"
                                label="Room"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_price"
                                label="Price"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name="rating_tour_operator"
                                label="Tour Operator"
                                rules={[{ required: true, message: 'Rating required' }]}
                            >
                                <Select placeholder="Select rating">
                                    {[1, 2, 3, 4, 5].map(n => <Select.Option key={n} value={n}>{n} ★</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider />
                    <Space>
                        <Button onClick={onBack}>Cancel</Button>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                            Save Review
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default AddReview;
