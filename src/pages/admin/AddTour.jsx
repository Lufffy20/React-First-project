import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Input, InputNumber, Switch, Select, Upload, message, Radio, Table, Space, Popconfirm, Modal, Divider, Typography } from 'antd';
import { UploadOutlined, LinkOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { useAdminTours } from '../../hooks/useAdminTours';
import { useNavigate } from 'react-router-dom';

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

const AddTour = () => {
    const { handleCreateTour } = useAdminTours();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // --- Nested States (Local Lists) ---
    const [itineraries, setItineraries] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [inclusions, setInclusions] = useState([]);
    const [exclusions, setExclusions] = useState([]);

    // Modals
    const [isItineraryModalVisible, setIsItineraryModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null); // Used for local editing
    const [itineraryForm] = Form.useForm();

    const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
    const [faqForm] = Form.useForm();

    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [imageForm] = Form.useForm();

    const [isFeatureModalVisible, setIsFeatureModalVisible] = useState(false);
    const [featureModalType, setFeatureModalType] = useState('inclusion'); // 'inclusion' or 'exclusion'
    const [featureForm] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            tour_type: 'Nature Tours',
            rating: 4.5,
            features: {
                best_price: true,
                free_cancel: true,
                is_featured: false
            },
            tour_language: ['English']
        });
    }, [form]);

    const handleUpload = (file) => {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
        return false;
    };

    // --- Local Nested Handlers ---

    // Itinerary
    const handleItineraryOk = async () => {
        const values = await itineraryForm.validateFields();
        if (editingIndex !== null) {
            const updated = [...itineraries];
            updated[editingIndex] = values;
            setItineraries(updated);
        } else {
            setItineraries([...itineraries, values]);
        }
        setIsItineraryModalVisible(false);
        setEditingIndex(null);
        itineraryForm.resetFields();
    };

    const handleFaqOk = async () => {
        const values = await faqForm.validateFields();
        if (editingIndex !== null) {
            const updated = [...faqs];
            updated[editingIndex] = values;
            setFaqs(updated);
        } else {
            setFaqs([...faqs, values]);
        }
        setIsFaqModalVisible(false);
        setEditingIndex(null);
        faqForm.resetFields();
    };

    const handleImageOk = async () => {
        const values = await imageForm.validateFields();
        setGallery([...gallery, values]);
        setIsImageModalVisible(false);
        imageForm.resetFields();
    };

    const handleFeatureOk = async () => {
        const values = await featureForm.validateFields();
        if (featureModalType === 'inclusion') {
            setInclusions([...inclusions, values]);
        } else {
            setExclusions([...exclusions, values]);
        }
        setIsFeatureModalVisible(false);
        featureForm.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (!imageFile) {
                message.error('Please select an image file');
                return;
            }

            setIsSubmitting(true);

            // Using FormData for multipart submission
            const formData = new FormData();

            // IMPORTANT: Append text fields FIRST and the file LAST.
            // This order allows Skipper to parse the text parameters early in the stream.
            formData.append('title', values.title);
            formData.append('location', values.location);
            formData.append('tour_type', values.tour_type);
            formData.append('description', values.description);
            formData.append('current_price', values.current_price);
            formData.append('days', values.days || 0);
            formData.append('nights', values.nights || 0);
            formData.append('rating', values.rating);
            formData.append('reviews_count', 0);

            if (values.old_price) formData.append('old_price', values.old_price);
            if (values.badge_text) formData.append('badge_text', values.badge_text);

            // Complex fields as JSON strings
            formData.append('tour_language', JSON.stringify(values.tour_language || ["English"]));
            formData.append('features', JSON.stringify(values.features || {
                best_price: false,
                free_cancel: false,
                is_featured: false
            }));

            // Nested Data
            formData.append('itineraries', JSON.stringify(itineraries));
            formData.append('faqs', JSON.stringify(faqs));
            formData.append('gallery', JSON.stringify(gallery));
            formData.append('inclusions', JSON.stringify(inclusions));
            formData.append('exclusions', JSON.stringify(exclusions));

            // APPEND FILE AT THE END
            formData.append('image', imageFile.originFileObj || imageFile);

            console.log("Submitting FormData... headers will be auto-set by Axios.");
            const success = await handleCreateTour(formData);

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
                    Add New Tour
                </div>
            }
        >
            <Form layout="vertical" form={form} onFinish={handleOk}>
                <Form.Item label={<b>Tour Image</b>} required>
                    <Upload beforeUpload={handleUpload} showUploadList={false} accept="image/*">
                        <Button icon={<UploadOutlined />}>Select Image File</Button>
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
                        <Form.Item name="rating" label={<b>Default Rating</b>} rules={[{ required: true }]}>
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
                        Create Tour
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
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingIndex(null); itineraryForm.resetFields(); setIsItineraryModalVisible(true); }}>
                            Add Day
                        </Button>
                    </div>
                    <Table
                        dataSource={itineraries}
                        rowKey={(record, index) => index}
                        pagination={false}
                        columns={[
                            { title: 'Day', dataIndex: 'day_number', key: 'day_number', width: 80 },
                            { title: 'Title', dataIndex: 'title', key: 'title' },
                            { title: 'Description', dataIndex: 'description', key: 'description' },
                            {
                                title: 'Actions',
                                key: 'actions',
                                width: 100,
                                render: (_, record, index) => (
                                    <Space>
                                        <Button icon={<EditOutlined />} onClick={() => { setEditingIndex(index); itineraryForm.setFieldsValue(record); setIsItineraryModalVisible(true); }} />
                                        <Button danger icon={<DeleteOutlined />} onClick={() => setItineraries(itineraries.filter((_, i) => i !== index))} />
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
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingIndex(null); faqForm.resetFields(); setIsFaqModalVisible(true); }}>
                            Add FAQ
                        </Button>
                    </div>
                    <Table
                        dataSource={faqs}
                        rowKey={(record, index) => index}
                        pagination={false}
                        columns={[
                            { title: 'Question', dataIndex: 'question', key: 'question' },
                            { title: 'Answer', dataIndex: 'answer', key: 'answer' },
                            {
                                title: 'Actions',
                                key: 'actions',
                                width: 100,
                                render: (_, record, index) => (
                                    <Space>
                                        <Button icon={<EditOutlined />} onClick={() => { setEditingIndex(index); faqForm.setFieldsValue(record); setIsFaqModalVisible(true); }} />
                                        <Button danger icon={<DeleteOutlined />} onClick={() => setFaqs(faqs.filter((_, i) => i !== index))} />
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
                        rowKey={(record, index) => index}
                        pagination={false}
                        columns={[
                            {
                                title: 'Image',
                                dataIndex: 'image_url',
                                render: (url) => <img src={url} alt="Gallery" style={{ width: 60, height: 40, objectFit: 'cover' }} />
                            },
                            { title: 'URL', dataIndex: 'image_url', key: 'image_url' },
                            {
                                title: 'Actions',
                                key: 'actions',
                                width: 80,
                                render: (_, record, index) => (
                                    <Button danger icon={<DeleteOutlined />} onClick={() => setGallery(gallery.filter((_, i) => i !== index))} />
                                )
                            }
                        ]}
                    />
                </div>

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
                            rowKey={(record, index) => index}
                            size="small"
                            pagination={false}
                            columns={[
                                { title: 'Item', dataIndex: 'item', key: 'item' },
                                {
                                    title: '',
                                    key: 'actions',
                                    render: (_, record, index) => (
                                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => setInclusions(inclusions.filter((_, i) => i !== index))} />
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
                            rowKey={(record, index) => index}
                            size="small"
                            pagination={false}
                            columns={[
                                { title: 'Item', dataIndex: 'item', key: 'item' },
                                {
                                    title: '',
                                    key: 'actions',
                                    render: (_, record, index) => (
                                        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => setExclusions(exclusions.filter((_, i) => i !== index))} />
                                    )
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </div>

            {/* --- Modals --- */}
            <Modal title={editingIndex !== null ? "Edit Day" : "Add Day"} open={isItineraryModalVisible} onOk={handleItineraryOk} onCancel={() => setIsItineraryModalVisible(false)}>
                <Form form={itineraryForm} layout="vertical">
                    <Form.Item name="day_number" label="Day Number" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="description" label="Description"><Input.TextArea rows={4} /></Form.Item>
                </Form>
            </Modal>

            <Modal title={editingIndex !== null ? "Edit FAQ" : "Add FAQ"} open={isFaqModalVisible} onOk={handleFaqOk} onCancel={() => setIsFaqModalVisible(false)}>
                <Form form={faqForm} layout="vertical">
                    <Form.Item name="question" label="Question" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="answer" label="Answer" rules={[{ required: true }]}><Input.TextArea rows={4} /></Form.Item>
                </Form>
            </Modal>

            <Modal title="Add Gallery Image" open={isImageModalVisible} onOk={handleImageOk} onCancel={() => setIsImageModalVisible(false)}>
                <Form form={imageForm} layout="vertical">
                    <Form.Item name="image_url" label="Image URL" rules={[{ required: true, type: 'url' }]}><Input /></Form.Item>
                </Form>
            </Modal>

            <Modal title={featureModalType === 'inclusion' ? "Add Inclusion" : "Add Exclusion"} open={isFeatureModalVisible} onOk={handleFeatureOk} onCancel={() => setIsFeatureModalVisible(false)}>
                <Form form={featureForm} layout="vertical">
                    <Form.Item name="item" label="Item Name" rules={[{ required: true }]}><Input /></Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default AddTour;
