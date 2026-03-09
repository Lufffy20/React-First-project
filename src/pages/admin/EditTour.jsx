import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Input, InputNumber, Switch, Select, Upload, message, Spin, Table, Space, Popconfirm, Modal, Divider, Typography } from 'antd';
import { UploadOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import { useAdminTours } from '../../hooks/useAdminTours';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const WORLD_LANGUAGES = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bosnian", "Bulgarian", "Catalan", "Cebuano", "Chichewa", "Chinese", "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar (Burmese)", "Nepali", "Norwegian", "Odia (Oriya)", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Turkish", "Turkmen", "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];

const SubmitButton = ({ form, children, loading }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            loading={loading}
            style={{
                backgroundColor: submittable ? '#eb6e34' : undefined,
                borderColor: submittable ? '#eb6e34' : undefined,
            }}
        >
            {children}
        </Button>
    );
};

const EditTour = () => {
    const {
        handleUpdateTour,
        // Nested Handlers
        handleAddItinerary, handleUpdateItinerary, handleDeleteItinerary,
        handleAddFaq, handleUpdateFaq, handleDeleteFaq,
        handleAddImage, handleDeleteImage,
        handleAddInclusion, handleDeleteInclusion,
        handleAddExclusion, handleDeleteExclusion
    } = useAdminTours();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [tourNotFound, setTourNotFound] = useState(false);

    // --- Nested States ---
    const [itineraries, setItineraries] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [inclusions, setInclusions] = useState([]);
    const [exclusions, setExclusions] = useState([]);

    // Modals
    const [isItineraryModalVisible, setIsItineraryModalVisible] = useState(false);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const [itineraryForm] = Form.useForm();

    const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [faqForm] = Form.useForm();

    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [imageForm] = Form.useForm();

    const [isFeatureModalVisible, setIsFeatureModalVisible] = useState(false);
    const [featureModalType, setFeatureModalType] = useState('inclusion'); // 'inclusion' or 'exclusion'
    const [featureForm] = Form.useForm();

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                setIsLoading(true);
                // Dynamically import to avoid touching line 1-10 string
                const { getTourApi } = await import('../../helper/functionapi');
                const response = await getTourApi(id);
                const tourData = response.data;

                if (tourData) {
                    form.setFieldsValue({
                        title: tourData.title,
                        location: tourData.location,
                        tour_type: tourData.tour_type,
                        description: tourData.description,
                        current_price: tourData.current_price,
                        old_price: tourData.old_price,
                        badge_text: tourData.badge_text,
                        rating: tourData.rating || 4.5,
                        days: tourData.days || 0,
                        nights: tourData.nights || 0,
                        tour_language: Array.isArray(tourData.tour_language) ? tourData.tour_language : [tourData.tour_language].filter(Boolean),
                        features: {
                            best_price: tourData.features?.best_price || false,
                            free_cancel: tourData.features?.free_cancel || false,
                            is_featured: tourData.features?.is_featured || false
                        }
                    });

                    setItineraries(tourData.itineraries || []);
                    setFaqs(tourData.faqs || []);
                    setGallery(tourData.images || []);
                    setInclusions(tourData.inclusions || []);
                    setExclusions(tourData.exclusions || []);

                    if (tourData.image) {
                        setPreviewUrl(`http://localhost:1337${tourData.image}`);
                    }
                } else {
                    setTourNotFound(true);
                }
            } catch (err) {
                console.error("Error fetching individual tour data for edit:", err);
                setTourNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchTourDetails();
        }
    }, [id, form]);

    const handleUpload = (file) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    // --- Nested Handlers Implementation ---

    // Itinerary
    const handleItineraryOk = async () => {
        const values = await itineraryForm.validateFields();
        if (editingItinerary) {
            const updated = await handleUpdateItinerary(editingItinerary.id, values);
            if (updated) setItineraries(itineraries.map(i => i.id === editingItinerary.id ? updated : i));
        } else {
            const created = await handleAddItinerary(id, values);
            if (created) setItineraries([...itineraries, created]);
        }
        setIsItineraryModalVisible(false);
        itineraryForm.resetFields();
    };

    const handleItineraryDelete = async (recordId) => {
        if (await handleDeleteItinerary(recordId)) {
            setItineraries(itineraries.filter(i => i.id !== recordId));
        }
    };

    // FAQ
    const handleFaqOk = async () => {
        const values = await faqForm.validateFields();
        if (editingFaq) {
            const updated = await handleUpdateFaq(editingFaq.id, values);
            if (updated) setFaqs(faqs.map(f => f.id === editingFaq.id ? updated : f));
        } else {
            const created = await handleAddFaq(id, values);
            if (created) setFaqs([...faqs, created]);
        }
        setIsFaqModalVisible(false);
        faqForm.resetFields();
    };

    const handleFaqDelete = async (recordId) => {
        if (await handleDeleteFaq(recordId)) {
            setFaqs(faqs.filter(f => f.id !== recordId));
        }
    };

    // Image
    const handleImageOk = async () => {
        const values = await imageForm.validateFields();
        const created = await handleAddImage(id, values);
        if (created) setGallery([...gallery, created]);
        setIsImageModalVisible(false);
        imageForm.resetFields();
    };

    const handleImageDelete = async (recordId) => {
        if (await handleDeleteImage(recordId)) {
            setGallery(gallery.filter(img => img.id !== recordId));
        }
    };

    // Features (Inclusions/Exclusions)
    const handleFeatureOk = async () => {
        const values = await featureForm.validateFields();
        if (featureModalType === 'inclusion') {
            const created = await handleAddInclusion(id, values);
            if (created) setInclusions([...inclusions, created]);
        } else {
            const created = await handleAddExclusion(id, values);
            if (created) setExclusions([...exclusions, created]);
        }
        setIsFeatureModalVisible(false);
        featureForm.resetFields();
    };

    const handleFeatureDelete = async (recordId, type) => {
        if (type === 'inclusion') {
            if (await handleDeleteInclusion(recordId)) setInclusions(inclusions.filter(i => i.id !== recordId));
        } else {
            if (await handleDeleteExclusion(recordId)) setExclusions(exclusions.filter(i => i.id !== recordId));
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            setIsSubmitting(true);
            // Using FormData for multipart submission
            const formData = new FormData();

            formData.append('title', values.title);
            formData.append('location', values.location);
            formData.append('tour_type', values.tour_type);
            formData.append('description', values.description);
            formData.append('current_price', values.current_price);
            formData.append('days', values.days || 0);
            formData.append('nights', values.nights || 0);
            formData.append('rating', values.rating);

            if (values.old_price) formData.append('old_price', values.old_price);
            if (values.badge_text) formData.append('badge_text', values.badge_text);

            formData.append('tour_language', JSON.stringify(values.tour_language || ["English"]));
            formData.append('features', JSON.stringify(values.features || {
                best_price: false,
                free_cancel: false,
                is_featured: false
            }));

            // Only append an image file if the user picked a new one
            if (imageFile) {
                formData.append('image', imageFile.originFileObj || imageFile);
            }

            const success = await handleUpdateTour(id, formData);

            if (success) {
                navigate('/admin/tours');
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card
            title={
                <div>
                    <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/tours')} style={{ paddingLeft: 0 }}>
                        Back to Tours
                    </Button>
                    <br />
                    Edit Tour
                </div>
            }
        >
            <Spin spinning={isLoading} description="Loading tour details...">
                {tourNotFound ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                        <h2>Tour not found!</h2>
                        <Button onClick={() => navigate('/admin/tours')}>Return to Tours List</Button>
                    </div>
                ) : (
                    <>
                        <Form layout="vertical" form={form} onFinish={handleOk}>
                            <Form.Item label={<b>Tour Image (Optional)</b>} help="Select an image only if you want to replace the existing one.">
                                <Upload beforeUpload={handleUpload} showUploadList={false} accept="image/*">
                                    <Button icon={<UploadOutlined />}>Change Image File</Button>
                                </Upload>
                                {previewUrl && (
                                    <div style={{ marginTop: 16 }}>
                                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px', border: '1px solid #d9d9d9' }} />
                                    </div>
                                )}
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="title" label={<b>Tour Title</b>} rules={[{ required: true, message: 'Missing title!' }]}>
                                        <Input placeholder="E.g. Desert Safari Adventure" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="location" label={<b>Location</b>} rules={[{ required: true, message: 'Missing location!' }]}>
                                        <Input placeholder="E.g. Dubai, UAE" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="tour_type" label={<b>Tour Type</b>} rules={[{ required: true }]}>
                                        <Select>
                                            <Option value="Nature Tours">Nature Tours</Option>
                                            <Option value="Adventure Tours">Adventure Tours</Option>
                                            <Option value="Cultural Tours">Cultural Tours</Option>
                                            <Option value="Food Tours">Food Tours</Option>
                                            <Option value="City Tours">City Tours</Option>
                                            <Option value="Cruises Tours">Cruises Tours</Option>
                                            <Option value="Beach Tours">Beach Tours</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="days" label={<b>Days</b>} rules={[{ required: true }]}>
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="2" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="nights" label={<b>Nights</b>} rules={[{ required: true }]}>
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="1" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="description" label={<b>Description</b>} rules={[{ required: true }]}>
                                        <Input.TextArea rows={3} placeholder="Brief description of the tour..." />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="current_price" label={<b>Current Price ($)</b>} rules={[{ required: true }]}>
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="999" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="old_price" label={<b>Old Price ($)</b>}>
                                        <InputNumber min={0} style={{ width: '100%' }} placeholder="1200" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="rating" label={<b>Rating</b>} rules={[{ required: true }]}>
                                        <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="badge_text" label={<b>Badge Text (Optional)</b>}>
                                        <Input placeholder="e.g. 20% OFF or FEATURED" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="tour_language" label={<b>Tour Language</b>} rules={[{ required: true }]}>
                                        <Select mode="multiple" allowClear showSearch placeholder="Select languages">
                                            {WORLD_LANGUAGES.map(lang => (
                                                <Option key={lang} value={lang}>{lang}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16} align="middle">
                                <Col span={6}>
                                    <Form.Item name={['features', 'best_price']} valuePropName="checked">
                                        <Switch checkedChildren="Best Price" unCheckedChildren="No" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name={['features', 'free_cancel']} valuePropName="checked">
                                        <Switch checkedChildren="Free Cancel" unCheckedChildren="No" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name={['features', 'is_featured']} valuePropName="checked">
                                        <Switch checkedChildren="Featured" unCheckedChildren="Standard" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24, gap: 12 }}>
                                <Button onClick={() => navigate('/admin/tours')}>Cancel</Button>
                                <SubmitButton form={form} loading={isSubmitting}>
                                    Update Tour
                                </SubmitButton>
                            </div>
                        </Form>

                        <Divider />

                        {/* --- Nested Resources UI --- */}
                        <div style={{ paddingBottom: 50 }}>
                            {/* Itinerary */}
                            <div style={{ marginBottom: 40 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <Title level={4}>Tour Itinerary</Title>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingItinerary(null); itineraryForm.resetFields(); setIsItineraryModalVisible(true); }}>
                                        Add Day
                                    </Button>
                                </div>
                                <Table
                                    dataSource={itineraries}
                                    rowKey="id"
                                    pagination={false}
                                    columns={[
                                        { title: 'Day', dataIndex: 'day_number', key: 'day_number', width: 80 },
                                        { title: 'Title', dataIndex: 'title', key: 'title' },
                                        { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
                                        {
                                            title: 'Actions',
                                            key: 'actions',
                                            width: 120,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button icon={<EditOutlined />} onClick={() => { setEditingItinerary(record); itineraryForm.setFieldsValue(record); setIsItineraryModalVisible(true); }} />
                                                    <Popconfirm title="Delete this day?" onConfirm={() => handleItineraryDelete(record.id)}>
                                                        <Button danger icon={<DeleteOutlined />} />
                                                    </Popconfirm>
                                                </Space>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* FAQ */}
                            <div style={{ marginBottom: 40 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <Title level={4}>FAQs</Title>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingFaq(null); faqForm.resetFields(); setIsFaqModalVisible(true); }}>
                                        Add FAQ
                                    </Button>
                                </div>
                                <Table
                                    dataSource={faqs}
                                    rowKey="id"
                                    pagination={false}
                                    columns={[
                                        { title: 'Question', dataIndex: 'question', key: 'question' },
                                        { title: 'Answer', dataIndex: 'answer', key: 'answer', ellipsis: true },
                                        {
                                            title: 'Actions',
                                            key: 'actions',
                                            width: 120,
                                            render: (_, record) => (
                                                <Space>
                                                    <Button icon={<EditOutlined />} onClick={() => { setEditingFaq(record); faqForm.setFieldsValue(record); setIsFaqModalVisible(true); }} />
                                                    <Popconfirm title="Delete this FAQ?" onConfirm={() => handleFaqDelete(record.id)}>
                                                        <Button danger icon={<DeleteOutlined />} />
                                                    </Popconfirm>
                                                </Space>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* Image Gallery */}
                            <div style={{ marginBottom: 40 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <Title level={4}>Image Gallery</Title>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={() => { imageForm.resetFields(); setIsImageModalVisible(true); }}>
                                        Add Image URL
                                    </Button>
                                </div>
                                <Table
                                    dataSource={gallery}
                                    rowKey="id"
                                    pagination={false}
                                    columns={[
                                        {
                                            title: 'Image',
                                            dataIndex: 'image_url',
                                            key: 'image_url',
                                            render: (url) => <img src={url} alt="Gallery" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                                        },
                                        { title: 'URL', dataIndex: 'image_url', key: 'image_url_text' },
                                        {
                                            title: 'Actions',
                                            key: 'actions',
                                            width: 80,
                                            render: (_, record) => (
                                                <Popconfirm title="Remove this image?" onConfirm={() => handleImageDelete(record.id)}>
                                                    <Button danger icon={<DeleteOutlined />} />
                                                </Popconfirm>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* Inclusions & Exclusions */}
                            <Row gutter={24}>
                                <Col span={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                        <Title level={4}>Inclusions</Title>
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => { setFeatureModalType('inclusion'); featureForm.resetFields(); setIsFeatureModalVisible(true); }}>
                                            Add
                                        </Button>
                                    </div>
                                    <Table
                                        dataSource={inclusions}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                        columns={[
                                            { title: 'Item', dataIndex: 'item', key: 'item' },
                                            {
                                                title: '',
                                                key: 'actions',
                                                width: 50,
                                                render: (_, record) => (
                                                    <Popconfirm title="Delete?" onConfirm={() => handleFeatureDelete(record.id, 'inclusion')}>
                                                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                                                    </Popconfirm>
                                                )
                                            }
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                        <Title level={4}>Exclusions</Title>
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => { setFeatureModalType('exclusion'); featureForm.resetFields(); setIsFeatureModalVisible(true); }}>
                                            Add
                                        </Button>
                                    </div>
                                    <Table
                                        dataSource={exclusions}
                                        rowKey="id"
                                        pagination={false}
                                        size="small"
                                        columns={[
                                            { title: 'Item', dataIndex: 'item', key: 'item' },
                                            {
                                                title: '',
                                                key: 'actions',
                                                width: 50,
                                                render: (_, record) => (
                                                    <Popconfirm title="Delete?" onConfirm={() => handleFeatureDelete(record.id, 'exclusion')}>
                                                        <Button type="text" danger icon={<DeleteOutlined />} size="small" />
                                                    </Popconfirm>
                                                )
                                            }
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </div>

                        {/* --- Modals --- */}

                        {/* Itinerary Modal */}
                        <Modal
                            title={editingItinerary ? "Edit Day Plan" : "Add Day Plan"}
                            open={isItineraryModalVisible}
                            onOk={handleItineraryOk}
                            onCancel={() => setIsItineraryModalVisible(false)}
                        >
                            <Form form={itineraryForm} layout="vertical">
                                <Form.Item name="day_number" label="Day Number" rules={[{ required: true }]}>
                                    <InputNumber min={1} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                                    <Input placeholder="e.g. Arrival and Check-in" />
                                </Form.Item>
                                <Form.Item name="description" label="Description">
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* FAQ Modal */}
                        <Modal
                            title={editingFaq ? "Edit FAQ" : "Add FAQ"}
                            open={isFaqModalVisible}
                            onOk={handleFaqOk}
                            onCancel={() => setIsFaqModalVisible(false)}
                        >
                            <Form form={faqForm} layout="vertical">
                                <Form.Item name="question" label="Question" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="answer" label="Answer" rules={[{ required: true }]}>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Image Modal */}
                        <Modal
                            title="Add Image to Gallery"
                            open={isImageModalVisible}
                            onOk={handleImageOk}
                            onCancel={() => setIsImageModalVisible(false)}
                        >
                            <Form form={imageForm} layout="vertical">
                                <Form.Item name="image_url" label="Image URL" rules={[{ required: true, type: 'url' }]}>
                                    <Input placeholder="https://example.com/image.jpg" />
                                </Form.Item>
                            </Form>
                        </Modal>

                        {/* Features Modal */}
                        <Modal
                            title={featureModalType === 'inclusion' ? "Add Inclusion" : "Add Exclusion"}
                            open={isFeatureModalVisible}
                            onOk={handleFeatureOk}
                            onCancel={() => setIsFeatureModalVisible(false)}
                        >
                            <Form form={featureForm} layout="vertical">
                                <Form.Item name="item" label="Item Name" rules={[{ required: true }]}>
                                    <Input placeholder="e.g. Luxury Hotel Stay" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                )}
            </Spin>
        </Card >
    );
};

export default EditTour;
