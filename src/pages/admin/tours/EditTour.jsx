import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Input, InputNumber, Switch, Select, Upload, message, Spin, Typography } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;
import { useAdminTours } from '../../../hooks/useAdminTours';
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
        handleUpdateTour
    } = useAdminTours();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    // --- UI State ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [tourNotFound, setTourNotFound] = useState(false);

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                setIsLoading(true);
                // Dynamically import to avoid touching line 1-10 string
                const { getTourApi } = await import('../../../helper/functionapi');
                const response = await getTourApi(id);
                const tourData = response.data?.data || response.data;

                if (tourData && (tourData.title || tourData.id)) {
                    form.setFieldsValue({
                        title: tourData.title,
                        location: tourData.location,
                        tour_type: tourData.tour_type,
                        description: tourData.description,
                        current_price: tourData.current_price,
                        old_price: tourData.old_price,
                        badge_text: tourData.badge_text,
                        days: tourData.days || 0,
                        nights: tourData.nights || 0,
                        group_size: tourData.group_size || '',
                        ages: tourData.ages || '',
                        tour_language: Array.isArray(tourData.tour_language) ? tourData.tour_language : [tourData.tour_language].filter(Boolean),
                        features: {
                            best_price: tourData.features?.best_price || false,
                            free_cancel: tourData.features?.free_cancel || false,
                            is_featured: tourData.features?.is_featured || false
                        }
                    });

                    const gallery = tourData.gallery || tourData.images || [];
                    const primaryImg = gallery.find(img => img.is_primary) || gallery[0];
                    if (primaryImg) {
                        setPreviewUrl(`http://localhost:1337${primaryImg.image_url}`);
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
            formData.append('group_size', values.group_size);
            formData.append('ages', values.ages);

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
        <div className="admin-form-container">
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
                                                <Option value="Wildlife Tours">Wildlife Tours</Option>
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
                                    <Col span={12}>
                                        <Form.Item name="group_size" label={<b>Group Size</b>} rules={[{ required: true }]}>
                                            <Input placeholder="E.g. 10 people" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="ages" label={<b>Ages</b>} rules={[{ required: true }]}>
                                            <Input placeholder="E.g. 18-99 yrs" />
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
                        </>
                    )}
                </Spin>
            </Card>
        </div>
    );
};

export default EditTour;
