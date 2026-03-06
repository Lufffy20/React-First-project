import React, { useEffect } from 'react';
import { Button, Form, Input, Row, Col, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useAuth';
import SideDesign from '../../components/login/SideDesign';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // URL se token nikal rahe hain (e.g., ?token=xyz)
    const token = searchParams.get('token');
    const { loading, handleResetPassword } = useResetPassword(token);

    useEffect(() => {
        if (!token) {
            message.error("Invalid or missing reset token. Please request a new link.");
            navigate('/forgot-password');
        }
    }, [token, navigate]);

    return (
        <div className="reset-password-container">
            <div className="ellipse-1 d-none d-lg-block"></div>
            <div className="ellipse-3 d-none d-lg-block"></div>
            <div className="ellipse-2 d-none d-lg-block"></div>
            <div className="group-1171274837-1 d-none d-lg-block"></div>
            <div className="group-1171274837-2 d-none d-lg-block"></div>

            <Row
                justify="center"
                align="middle"
                gutter={[40, 40]}
                className="reset-password-row"
            >
                <Col xs={0} sm={0} md={0} lg={12} xl={10}>
                    <SideDesign />
                </Col>

                <Col xs={24} sm={24} md={18} lg={12} xl={10} className="reset-password-col">
                    <div className="reset-password-card">
                        <div className="reset-password-content">
                            <Form
                                name="resetPassword"
                                layout="vertical"
                                style={{ width: '100%' }}
                                onFinish={handleResetPassword}
                                autoComplete="off"
                            >
                                <h3>Reset Your Password</h3>
                                <p>Set a new, strong password for your Annaizu account.</p>

                                <Form.Item
                                    label="New Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter your new password!' },
                                        { min: 6, message: 'Password must be at least 6 characters!' }
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password size="large" placeholder="Enter New Password" />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size="large" placeholder="Confirm New Password" />
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: '100%', borderRadius: '50px' }}
                                        loading={loading}
                                    >
                                        Update Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ResetPasswordPage;
