import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTour } from "../../redux/tours/toursSlice";
import { useNavigate } from "react-router-dom";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { Form, Input, InputNumber, Select, Checkbox, Radio, Button, Space, Upload, message } from 'antd';
import { UploadOutlined, LinkOutlined } from '@ant-design/icons';
import "./addtour.css";

const { Option } = Select;

const WORLD_LANGUAGES = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani", "Basque", "Belarusian", "Bengali", "Bosnian", "Bulgarian", "Catalan", "Cebuano", "Chichewa", "Chinese", "Corsican", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Frisian", "Galician", "Georgian", "German", "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin", "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Myanmar (Burmese)", "Nepali", "Norwegian", "Odia (Oriya)", "Pashto", "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Samoan", "Scots Gaelic", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Turkish", "Turkmen", "Ukrainian", "Urdu", "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];

// Custom Submit Button provided by user
const SubmitButton = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState(false);
    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            style={{
                backgroundColor: submittable ? '#eb6e34' : undefined,
                borderColor: submittable ? '#eb6e34' : undefined,
                height: '40px',
                padding: '0 24px',
                fontSize: '16px',
                fontWeight: '600'
            }}
        >
            {children}
        </Button>
    );
};

const AddTour = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    // State to track whether user wants to use a URL or upload a file
    const [imageType, setImageType] = useState('url');
    // State to hold the base64 string if they upload a file
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const handleImageTypeChange = (e) => {
        setImageType(e.target.value);
    };

    const handleUpload = (info) => {
        // Prevent default upload and convert file to base64 Data URL for Redux storage
        const file = info;
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImageUrl(e.target.result);
            message.success('Image loaded successfully');
        };
        reader.readAsDataURL(file);
        return false; // Very important: stops Antd from attempting a real POST request
    };

    const onFinish = (values) => {
        // Determine final image payload
        let finalImage = "";
        if (imageType === 'url') {
            finalImage = values.imageUrl;
            if (!finalImage) {
                message.error('Please enter an image URL');
                return;
            }
        } else {
            finalImage = uploadedImageUrl;
            if (!finalImage) {
                message.error('Please upload an image file');
                return;
            }
        }

        const newTour = {
            image: finalImage,
            badge: values.badge || "",
            location: values.location,
            title: values.title,
            rating: values.rating,
            reviews: 0,
            description: values.description,
            bestPrice: values.bestPrice || false,
            freeCancel: values.freeCancel || false,
            duration: `${values.durationDays} Days ${values.durationNights} Nights`,
            oldPrice: values.oldPrice ? Number(values.oldPrice) : null,
            price: Number(values.price),
            type: values.type,
            language: values.language || ["English"],
            badgeColor: values.badge ? "#eb6e34" : null
        };

        dispatch(addTour(newTour));
        message.success('Tour added successfully!');
        navigate("/all-tours-details");
    };

    return (
        <>
            <Header />
            <div className="add-tour-wrapper">
                <div className="add-tour-container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <div className="add-tour-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#101828', marginBottom: '10px' }}>Add New Tour</h2>
                        <p style={{ color: '#666', fontSize: '16px' }}>Fill out the form below to add a new tour to the catalog.</p>
                    </div>

                    <Form
                        form={form}
                        name="addTourForm"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                            type: 'Nature Tours',
                            rating: 4.5,
                            bestPrice: true,
                            freeCancel: true
                        }}
                    >

                        <Form.Item label={<b>Tour Image Source</b>} required>
                            <Radio.Group onChange={handleImageTypeChange} value={imageType} style={{ marginBottom: '16px' }}>
                                <Radio value="url">Enter Image URL</Radio>
                                <Radio value="upload">Upload Image from Device</Radio>
                            </Radio.Group>

                            {imageType === 'url' ? (
                                <Form.Item
                                    name="imageUrl"
                                    rules={[{ required: imageType === 'url', message: 'Please enter the image URL!' }]}
                                    noStyle
                                >
                                    <Input prefix={<LinkOutlined />} placeholder="https://images.unsplash.com/..." size="large" />
                                </Form.Item>
                            ) : (
                                <div style={{ marginTop: '8px' }}>
                                    <Upload
                                        beforeUpload={handleUpload}
                                        showUploadList={false}
                                        accept="image/*"
                                    >
                                        <Button icon={<UploadOutlined />} size="large">Select Image File</Button>
                                    </Upload>
                                    {uploadedImageUrl && <span style={{ marginLeft: 16, color: '#52c41a', fontWeight: '500' }}>✓ Image ready!</span>}
                                </div>
                            )}
                        </Form.Item>

                        <Form.Item
                            name="title"
                            label={<b>Tour Title</b>}
                            rules={[{ required: true, message: 'Please input the tour title!' }]}
                        >
                            <Input placeholder="e.g. Desert Safari Adventure" size="large" />
                        </Form.Item>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Form.Item
                                name="location"
                                label={<b>Location</b>}
                                rules={[{ required: true, message: 'Please input the location!' }]}
                                style={{ flex: 1 }}
                            >
                                <Input placeholder="e.g. Dubai, UAE" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="type"
                                label={<b>Tour Type</b>}
                                rules={[{ required: true, message: 'Please select a tour type!' }]}
                                style={{ flex: 1 }}
                            >
                                <Select size="large">
                                    <Option value="Nature Tours">Nature Tours</Option>
                                    <Option value="Adventure Tours">Adventure Tours</Option>
                                    <Option value="Cultural Tours">Cultural Tours</Option>
                                    <Option value="Food Tours">Food Tours</Option>
                                    <Option value="City Tours">City Tours</Option>
                                    <Option value="Cruises Tours">Cruises Tours</Option>
                                    <Option value="Beach Tours">Beach Tours</Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="description"
                            label={<b>Description</b>}
                            rules={[{ required: true, message: 'Please input the description!' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Brief description of the tour..." />
                        </Form.Item>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Form.Item
                                name="durationDays"
                                label={<b>Days</b>}
                                rules={[{ required: true, message: 'Please input days!' }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g. 2" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="durationNights"
                                label={<b>Nights</b>}
                                rules={[{ required: true, message: 'Please input nights!' }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g. 1" size="large" />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Form.Item
                                name="price"
                                label={<b>Current Price (USD)</b>}
                                rules={[{ required: true, message: 'Please input the current price!' }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="999" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="oldPrice"
                                label={<b>Old Price (USD)</b>}
                                style={{ flex: 1 }}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="1200" size="large" />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Form.Item
                                name="rating"
                                label={<b>Default Rating</b>}
                                rules={[{ required: true, message: 'Please input the rating!' }]}
                                style={{ flex: 1 }}
                            >
                                <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="badge"
                                label={<b>Badge Text (Optional)</b>}
                                style={{ flex: 1 }}
                            >
                                <Input placeholder="e.g. 20% OFF or FEATURED" size="large" />
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <Form.Item
                                name="language"
                                label={<b>Tour Language</b>}
                                rules={[{ required: true, message: 'Please select a language!' }]}
                                style={{ flex: 1 }}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    size="large"
                                    placeholder="Select languages"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {WORLD_LANGUAGES.map(lang => (
                                        <Option key={lang} value={lang}>{lang}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
                            <Form.Item name="bestPrice" valuePropName="checked" noStyle>
                                <Checkbox><b>Best Price Guarantee</b></Checkbox>
                            </Form.Item>
                            <Form.Item name="freeCancel" valuePropName="checked" noStyle>
                                <Checkbox><b>Free Cancellation</b></Checkbox>
                            </Form.Item>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eaeaea', paddingTop: '24px' }}>
                            <Space size="large">
                                <Button
                                    size="large"
                                    onClick={() => navigate("/all-tours-details")}
                                    style={{ height: '40px', padding: '0 24px', fontSize: '16px', fontWeight: '600' }}
                                >
                                    Cancel
                                </Button>
                                <SubmitButton form={form}>
                                    Add Tour
                                </SubmitButton>
                            </Space>
                        </div>

                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddTour;
