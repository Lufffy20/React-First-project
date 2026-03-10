import React, { useState } from 'react';
import { Card, Form, Select, Button, Space, Divider, Upload, Typography, message } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, PlusOutlined, PictureOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AddGalleryImages = ({ tours, loading, onSave, onBack }) => {
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [fileList, setFileList] = useState([]);

    const handleUpload = async () => {
        if (!selectedTourId) {
            message.warning('Please select a tour first');
            return;
        }
        if (fileList.length === 0) {
            message.warning('Please select at least one image');
            return;
        }
        onSave(selectedTourId, fileList);
    };

    return (
        <div className="admin-form-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <Button icon={<ArrowLeftOutlined />} onClick={onBack}>Back to Gallery</Button>
                <Title level={4} style={{ margin: 0 }}>Add Gallery Images</Title>
            </div>

            <Card>
                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Select Tour</label>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Choose a tour for these images"
                        showSearch
                        optionFilterProp="children"
                        onChange={value => setSelectedTourId(value)}
                        loading={loading}
                    >
                        {tours.map(t => (
                            <Select.Option key={t.id} value={t.id}>{t.title}</Select.Option>
                        ))}
                    </Select>
                </div>

                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Upload Images</label>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={({ fileList }) => setFileList(fileList)}
                        beforeUpload={() => false}
                        multiple
                        accept="image/*"
                    >
                        {fileList.length >= 20 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Select</div>
                            </div>
                        )}
                    </Upload>
                    <Text type="secondary">You can select multiple images at once.</Text>
                </div>

                <Divider />
                <Space>
                    <Button onClick={onBack}>Cancel</Button>
                    <Button type="primary" icon={<SaveOutlined />} onClick={handleUpload} loading={loading}>
                        Upload to Gallery
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default AddGalleryImages;
