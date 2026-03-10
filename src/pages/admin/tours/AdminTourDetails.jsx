import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, Tag, Row, Col, Divider, List, Typography, Modal, Form, Input, Popconfirm, message, Upload } from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    InfoCircleOutlined,
    EnvironmentOutlined,
    DollarCircleOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    QuestionCircleOutlined,
    RocketOutlined,
    PlusOutlined,
    DeleteOutlined,
    UploadOutlined,
    StarOutlined,
    StarFilled
} from '@ant-design/icons';
import { getTourApi } from '../../../helper/functionapi';
import { useAdminTours } from '../../../hooks/useAdminTours';
import './AdminTourDetails.css';

const { Title, Text, Paragraph } = Typography;

const AdminTourDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        handleAddItinerary, handleUpdateItinerary, handleDeleteItinerary,
        handleAddFaq, handleUpdateFaq, handleDeleteFaq,
        handleAddInclusion, handleDeleteInclusion,
        handleAddExclusion, handleDeleteExclusion,
        handleAddImage, handleDeleteImage, handleSetPrimaryImage
    } = useAdminTours();

    // ... other states ...

    const handleSetPrimary = async (imageId) => {
        const success = await handleSetPrimaryImage(imageId);
        if (success) {
            fetchTourDetails();
        }
    };

    // Modal States
    const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false); // For Inclusions/Exclusions
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [featureType, setFeatureType] = useState('inclusion'); // 'inclusion' or 'exclusion'
    const [fileList, setFileList] = useState([]);

    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();

    const fetchTourDetails = async () => {
        try {
            setLoading(true);
            const response = await getTourApi(id);
            if (response.data && response.data.success) {
                setTour(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching tour details:", error);
            message.error("Failed to load tour details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchTourDetails();
        }
    }, [id]);

    // --- Action Handlers ---

    const handleOpenItineraryModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            form.setFieldsValue(item);
        } else {
            form.resetFields();
            // Auto-set next day number
            const nextDay = (tour.itineraries || []).length + 1;
            form.setFieldsValue({ day_number: nextDay });
        }
        setIsItineraryModalOpen(true);
    };

    const handleSaveItinerary = async (values) => {
        let success;
        if (editingItem) {
            success = await handleUpdateItinerary(editingItem.id, values);
        } else {
            success = await handleAddItinerary(id, values);
        }
        if (success) {
            setIsItineraryModalOpen(false);
            fetchTourDetails();
        }
    };

    const handleOpenFaqModal = (item = null) => {
        setEditingItem(item);
        if (item) {
            form.setFieldsValue(item);
        } else {
            form.resetFields();
        }
        setIsFaqModalOpen(true);
    };

    const handleSaveFaq = async (values) => {
        let success;
        if (editingItem) {
            success = await handleUpdateFaq(editingItem.id, values);
        } else {
            success = await handleAddFaq(id, values);
        }
        if (success) {
            setIsFaqModalOpen(false);
            fetchTourDetails();
        }
    };

    const handleOpenFeatureModal = (type) => {
        setFeatureType(type);
        form.resetFields();
        setIsFeatureModalOpen(true);
    };

    const handleSaveFeature = async (values) => {
        let success;
        if (featureType === 'inclusion') {
            success = await handleAddInclusion(id, values);
        } else {
            success = await handleAddExclusion(id, values);
        }
        if (success) {
            setIsFeatureModalOpen(false);
            fetchTourDetails();
        }
    };

    const handleDeleteFeature = async (type, itemId) => {
        let success;
        if (type === 'inclusion') {
            success = await handleDeleteInclusion(itemId);
        } else {
            success = await handleDeleteExclusion(itemId);
        }
        if (success) {
            fetchTourDetails();
        }
    };

    const handleOpenGalleryModal = () => {
        setFileList([]);
        setIsGalleryModalOpen(true);
    };

    const handleSaveGallery = async () => {
        if (fileList.length === 0) {
            message.warning("Please select at least one image");
            return;
        }

        let successAll = true;
        for (const file of fileList) {
            const formData = new FormData();
            formData.append('image', file.originFileObj);
            const res = await handleAddImage(id, formData);
            if (!res) successAll = false;
        }

        if (successAll) {
            setIsGalleryModalOpen(false);
            fetchTourDetails();
        }
    };

    const SectionHeader = ({ title, icon, data, onCreate, onEdit, onDelete }) => {
        const hasData = data && data.length > 0;
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>{icon} {title}</span>
                <div onClick={(e) => e.stopPropagation()}>
                    {!hasData ? (
                        <Button type="primary" size="small" icon={<PlusOutlined />} onClick={onCreate}>
                            Create
                        </Button>
                    ) : (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button size="small" icon={<EditOutlined />} onClick={onEdit || onCreate}>
                                Edit
                            </Button>
                            <Popconfirm
                                title={`Are you sure you want to delete all ${title}?`}
                                onConfirm={onDelete}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button size="small" danger icon={<DeleteOutlined />}>
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (loading && !tour) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" tip="Loading tour details..." />
            </div>
        );
    }

    if (!tour) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <Title level={3}>Tour not found</Title>
                <Button type="primary" onClick={() => navigate('/admin/tours')}>Back to Tours</Button>
            </div>
        );
    }

    return (
        <div className="admin-tour-details-container">
            <div className="admin-tour-details-header">
                <div>
                    <Text type="secondary">Tour Details</Text>
                    <Title level={2}>{tour.title}</Title>
                </div>
                <div>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin/tours')}
                        style={{ marginRight: 8 }}
                    >
                        Back to Tours
                    </Button>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/admin/tours/edit/${tour.id}`)}
                    >
                        Edit Tour
                    </Button>
                </div>
            </div>

            <div className="admin-tour-details-grid">
                {/* Tour Information */}
                <Card title={<span><InfoCircleOutlined /> Tour Information</span>} className="admin-tour-details-card">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Description</span>
                                    <Paragraph className="info-value">{tour.description}</Paragraph>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <EnvironmentOutlined className="info-icon" />
                                <div className="info-content">
                                    <span className="info-label">Location</span>
                                    <span className="info-value">{tour.location}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <ClockCircleOutlined className="info-icon" />
                                <div className="info-content">
                                    <span className="info-label">Duration</span>
                                    <span className="info-value">{tour.days} Days {tour.nights} Nights</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <GlobalOutlined className="info-icon" />
                                <div className="info-content">
                                    <span className="info-label">Language</span>
                                    <span className="info-value">{tour.tour_language}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <RocketOutlined className="info-icon" />
                                <div className="info-content">
                                    <span className="info-label">Status</span>
                                    <Tag color={tour.is_active ? 'green' : 'red'}>
                                        {tour.is_active ? 'Active' : 'Inactive'}
                                    </Tag>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Type</span>
                                    <span className="info-value">{tour.tour_type}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Group Size</span>
                                    <span className="info-value">{tour.group_size || 'N/A'}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Ages</span>
                                    <span className="info-value">{tour.ages || 'N/A'}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Badge</span>
                                    <Tag color="blue">{tour.badge_text || 'No Badge'}</Tag>
                                </div>
                            </div>
                        </Col>
                        {tour.features && (
                            <>
                                <Col span={12}>
                                    <div className="info-item">
                                        <div className="info-content">
                                            <span className="info-label">Best Price</span>
                                            <Tag color={tour.features.best_price ? 'gold' : 'default'}>
                                                {tour.features.best_price ? 'Yes' : 'No'}
                                            </Tag>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="info-item">
                                        <div className="info-content">
                                            <span className="info-label">Free Cancel</span>
                                            <Tag color={tour.features.free_cancel ? 'cyan' : 'default'}>
                                                {tour.features.free_cancel ? 'Yes' : 'No'}
                                            </Tag>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                </Card>

                {/* Pricing Information */}
                <Card title={<span><DollarCircleOutlined /> Pricing Information</span>} className="admin-tour-details-card">
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Current Price</span>
                                    <span className="info-value" style={{ fontSize: 20, color: '#f5222d' }}>${tour.current_price}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="info-item">
                                <div className="info-content">
                                    <span className="info-label">Old Price</span>
                                    <span className="info-value" style={{ textDecoration: 'line-through' }}>${tour.old_price}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <span className="info-label">Main Image</span>
                            {(() => {
                                const primaryImg = (tour.gallery || []).find(img => img.is_primary) || (tour.gallery || [])[0];
                                return primaryImg ? (
                                    <img src={`http://localhost:1337${primaryImg.image_url}`} alt="Main" className="tour-image-preview" />
                                ) : (
                                    <div style={{ height: 200, background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                                        No image available
                                    </div>
                                );
                            })()}
                        </Col>
                        {/* Old Preview Section */}
                    </Row>
                </Card>

                {/* Tour Gallery */}
                <Card
                    title={
                        <SectionHeader
                            title="Gallery"
                            icon={<RocketOutlined />}
                            data={tour.gallery}
                            onCreate={handleOpenGalleryModal}
                            onDelete={async () => {
                                for (const img of (tour.gallery || [])) {
                                    await handleDeleteImage(img.id);
                                }
                                fetchTourDetails();
                            }}
                        />
                    }
                    className="admin-tour-details-card"
                >
                    {tour.gallery && tour.gallery.length > 0 ? (
                        <div className="gallery-grid">
                            {tour.gallery.map((img, index) => (
                                <div key={index} className="gallery-item-container">
                                    <img
                                        src={`http://localhost:1337${img.image_url}`}
                                        alt={`Gallery ${index}`}
                                        className="gallery-item"
                                    />
                                    {img.is_primary && <Tag color="gold" className="gallery-primary-tag">Main</Tag>}
                                    <div className="gallery-item-actions">
                                        <Button
                                            size="small"
                                            type={img.is_primary ? "primary" : "default"}
                                            icon={img.is_primary ? <StarFilled /> : <StarOutlined />}
                                            onClick={() => !img.is_primary && handleSetPrimary(img.id)}
                                            style={{ marginRight: 4 }}
                                        />
                                        <Popconfirm title="Delete this image?" onConfirm={() => handleDeleteImage(img.id).then(fetchTourDetails)}>
                                            <Button size="small" danger icon={<DeleteOutlined />} />
                                        </Popconfirm>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#8c8c8c' }}>
                            No gallery images added
                        </div>
                    )}
                </Card>

                {/* Inclusions */}
                <Card
                    title={
                        <SectionHeader
                            title="Inclusions"
                            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                            data={tour.inclusions}
                            onCreate={() => handleOpenFeatureModal('inclusion')}
                            onDelete={async () => {
                                for (const item of (tour.inclusions || [])) {
                                    await handleDeleteInclusion(item.id);
                                }
                                fetchTourDetails();
                            }}
                        />
                    }
                    className="admin-tour-details-card"
                >
                    <List
                        dataSource={tour.inclusions || []}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Popconfirm title="Delete?" onConfirm={() => handleDeleteFeature('inclusion', item.id)}>
                                        <Button type="link" danger icon={<DeleteOutlined />} size="small" />
                                    </Popconfirm>
                                ]}
                            >
                                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} /> {item.item}
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No inclusions specified' }}
                    />
                </Card>

                {/* Exclusions */}
                <Card
                    title={
                        <SectionHeader
                            title="Exclusions"
                            icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                            data={tour.exclusions}
                            onCreate={() => handleOpenFeatureModal('exclusion')}
                            onDelete={async () => {
                                for (const item of (tour.exclusions || [])) {
                                    await handleDeleteExclusion(item.id);
                                }
                                fetchTourDetails();
                            }}
                        />
                    }
                    className="admin-tour-details-card"
                >
                    <List
                        dataSource={tour.exclusions || []}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Popconfirm title="Delete?" onConfirm={() => handleDeleteFeature('exclusion', item.id)}>
                                        <Button type="link" danger icon={<DeleteOutlined />} size="small" />
                                    </Popconfirm>
                                ]}
                            >
                                <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} /> {item.item}
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No exclusions specified' }}
                    />
                </Card>

                {/* FAQs */}
                <Card
                    title={
                        <SectionHeader
                            title="FAQs"
                            icon={<QuestionCircleOutlined />}
                            data={tour.faqs}
                            onCreate={() => handleOpenFaqModal()}
                            onDelete={async () => {
                                for (const item of (tour.faqs || [])) {
                                    await handleDeleteFaq(item.id);
                                }
                                fetchTourDetails();
                            }}
                        />
                    }
                    className="admin-tour-details-card"
                >
                    <List
                        dataSource={tour.faqs || []}
                        renderItem={item => (
                            <List.Item
                                actions={[
                                    <Button type="link" icon={<EditOutlined />} onClick={() => handleOpenFaqModal(item)} size="small" />,
                                    <Popconfirm title="Delete FAQ?" onConfirm={() => handleDeleteFaq(item.id).then(fetchTourDetails)}>
                                        <Button type="link" danger icon={<DeleteOutlined />} size="small" />
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    title={<strong>Q: {item.question}</strong>}
                                    description={<div>A: {item.answer}</div>}
                                />
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No FAQs added for this tour' }}
                    />
                </Card>

                {/* Itinerary */}
                <Card
                    title={
                        <SectionHeader
                            title="Itinerary"
                            icon={<ClockCircleOutlined />}
                            data={tour.itineraries}
                            onCreate={() => handleOpenItineraryModal()}
                            onDelete={async () => {
                                for (const item of (tour.itineraries || [])) {
                                    await handleDeleteItinerary(item.id);
                                }
                                fetchTourDetails();
                            }}
                        />
                    }
                    className="admin-tour-details-card full-width-section"
                >
                    <List
                        itemLayout="vertical"
                        dataSource={tour.itineraries || []}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button type="link" icon={<EditOutlined />} onClick={() => handleOpenItineraryModal(item)}>Edit</Button>,
                                    <Popconfirm title="Delete this day?" onConfirm={() => handleDeleteItinerary(item.id).then(fetchTourDetails)}>
                                        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
                                    </Popconfirm>
                                ]}
                            >
                                <List.Item.Meta
                                    title={<Title level={5}>Day {index + 1}: {item.title}</Title>}
                                    description={
                                        <span>
                                            <ClockCircleOutlined style={{ marginRight: 4, color: '#1890ff' }} />
                                            {item.time || 'N/A'}
                                        </span>
                                    }
                                />
                                <Paragraph>{item.description}</Paragraph>
                            </List.Item>
                        )}
                        locale={{ emptyText: 'No itinerary defined' }}
                    />
                </Card>
            </div>

            {/* Itinerary Modal */}
            <Modal
                title={editingItem ? "Edit Itinerary Day" : "Add Itinerary Day"}
                open={isItineraryModalOpen}
                onCancel={() => setIsItineraryModalOpen(false)}
                onOk={() => form.submit()}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSaveItinerary}>
                    <Form.Item name="day_number" label="Day Number" rules={[{ required: true }]}>
                        <Input type="number" placeholder="e.g. 1" />
                    </Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Arrival and City Tour" />
                    </Form.Item>
                    <Form.Item name="time" label="Time/Subtitle">
                        <Input placeholder="e.g. 09:00 AM" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>

            {/* FAQ Modal */}
            <Modal
                title={editingItem ? "Edit FAQ" : "Add FAQ"}
                open={isFaqModalOpen}
                onCancel={() => setIsFaqModalOpen(false)}
                onOk={() => form.submit()}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSaveFaq}>
                    <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Inclusion/Exclusion Modal */}
            <Modal
                title={`Add ${featureType === 'inclusion' ? 'Inclusion' : 'Exclusion'}`}
                open={isFeatureModalOpen}
                onCancel={() => setIsFeatureModalOpen(false)}
                onOk={() => form.submit()}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSaveFeature}>
                    <Form.Item name="item" label="Description" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Hotel pickup and drop-off" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Gallery Modal */}
            <Modal
                title="Add Gallery Images"
                open={isGalleryModalOpen}
                onCancel={() => setIsGalleryModalOpen(false)}
                onOk={handleSaveGallery}
                destroyOnClose
            >
                <div style={{ marginBottom: 16 }}>
                    <Text type="secondary">Select one or more images to add to the tour gallery.</Text>
                </div>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => setFileList(fileList)}
                    beforeUpload={() => false}
                    multiple
                    accept="image/*"
                >
                    {fileList.length >= 8 ? null : (
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    )}
                </Upload>
            </Modal>
        </div>
    );
};

export default AdminTourDetails;
