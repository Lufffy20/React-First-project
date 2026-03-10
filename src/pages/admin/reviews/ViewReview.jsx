import React from 'react';
import { Card, Button, Popconfirm, Typography, Descriptions, Rate, Tag, Space, Divider } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ViewReview = ({ review, loading, onEdit, onDelete, onBack }) => {
    if (!review) return null;

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to List</Button>
                <Title level={4} style={{ margin: 0 }}>View Review</Title>
            </div>

            <Card
                extra={
                    <Space>
                        <Button icon={<EditOutlined />} onClick={() => onEdit(review)}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Delete this review?"
                            description="This action cannot be undone."
                            onConfirm={() => onDelete(review.id)}
                            okText="Yes, Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true }}
                        >
                            <Button danger icon={<DeleteOutlined />} loading={loading}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                }
            >
                <Descriptions bordered column={2} size="middle">
                    <Descriptions.Item label="Reviewer Name" span={1}>
                        <strong>{review.reviewer_name}</strong>
                    </Descriptions.Item>
                    <Descriptions.Item label="Reviewer Email" span={1}>
                        {review.reviewer_email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Associated Tour" span={2}>
                        <Tag color="blue">{review.tourTitle || (review.tour?.title) || '—'}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Review Title" span={2}>
                        {review.title || <Typography.Text type="secondary">No title</Typography.Text>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Comment" span={2}>
                        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{review.comment}</p>
                    </Descriptions.Item>
                    <Descriptions.Item label="Overall Rating" span={2}>
                        <Rate disabled allowHalf defaultValue={review.overall_rating || 0} />
                        <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
                            ({review.overall_rating || 0} / 5)
                        </Typography.Text>
                    </Descriptions.Item>
                </Descriptions>

                <Divider>Individual Ratings</Divider>

                <Descriptions bordered column={3} size="small">
                    <Descriptions.Item label="Location">
                        <Rate disabled allowHalf defaultValue={review.rating_location || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_location || '—'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Amenities">
                        <Rate disabled allowHalf defaultValue={review.rating_amenities || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_amenities || '—'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Food">
                        <Rate disabled allowHalf defaultValue={review.rating_food || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_food || '—'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Room">
                        <Rate disabled allowHalf defaultValue={review.rating_room || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_room || '—'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">
                        <Rate disabled allowHalf defaultValue={review.rating_price || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_price || '—'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tour Operator">
                        <Rate disabled allowHalf defaultValue={review.rating_tour_operator || 0} style={{ fontSize: 14 }} />
                        <span style={{ marginLeft: 4 }}>{review.rating_tour_operator || '—'}</span>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default ViewReview;
