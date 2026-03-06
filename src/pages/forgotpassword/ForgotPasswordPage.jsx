import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import SideDesign from '../../components/login/SideDesign';
import { useForgotPassword } from '../../hooks/useAuth';
import './ForgotPasswordPage.css';

const App = () => {
    const navigate = useNavigate();
    const { loading, submitted, setSubmitted, handleForgotPassword } = useForgotPassword();

    return (
        <div className="forgot-password-container">
            <div className="ellipse-1 d-none d-lg-block"></div>
            <div className="ellipse-3 d-none d-lg-block"></div>
            <div className="ellipse-2 d-none d-lg-block"></div>
            <div className="group-1171274837-1 d-none d-lg-block"></div>
            <div className="group-1171274837-2 d-none d-lg-block"></div>

            <Row
                justify="center"
                align="middle"
                gutter={[40, 40]}
                className="forgot-password-row"
            >
                <Col xs={0} sm={0} md={0} lg={12} xl={10}>
                    <SideDesign />
                </Col>

                <Col xs={24} sm={24} md={18} lg={12} xl={10} className="forgot-password-col">
                    <div className="forgot-password-card">
                        <div className="forgot-password-content">
                            {!submitted ? (
                                <Form
                                    name="basic"
                                    layout="vertical"
                                    style={{ width: '100%' }}
                                    onFinish={handleForgotPassword}
                                    autoComplete="off"
                                >
                                    <h3>Forgot Password?</h3>
                                    <p style={{ textAlign: 'left' }}>Reset password with Annaizu Platform.</p>

                                    <div className='instruction-container'>
                                        <div className="icon-box">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/rhvddzym.json"
                                                trigger="loop"
                                                colors="primary:#f57c00,secondary:#f57c00"
                                                style={{ width: '58px', height: '58px' }}>
                                            </lord-icon>
                                        </div>
                                        <div className="text-box">
                                            <p style={{ textAlign: 'left', margin: '0' }}>Enter your email and instructions will be sent to you!</p>
                                        </div>
                                    </div>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Email cannot be blank.' }]}
                                    >
                                        <Input size="large" placeholder="Enter a Valid Email" />
                                    </Form.Item>

                                    <Form.Item label={null}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            style={{ width: '100%', borderRadius: '50px' }}
                                            loading={loading}
                                        >
                                            Send Reset Link
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <div style={{ textAlign: 'center' }}>
                                            Remembered your password? <Link to="/login" style={{ textDecoration: 'underline', color: '#1a237e', fontWeight: 'bold' }}>Login here</Link>
                                        </div>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/lupuorrc.json"
                                            trigger="loop"
                                            colors="primary:#1a237e,secondary:#4caf50"
                                            style={{ width: '100px', height: '100px' }}>
                                        </lord-icon>
                                    </div>
                                    <h3>Check Your Email</h3>
                                    <p>We've sent a password reset link to your email address. Please check your inbox (and spam folder) for further instructions.</p>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{ width: '100%', borderRadius: '50px', marginTop: '20px' }}
                                        onClick={() => navigate('/login')}
                                    >
                                        Return to Login
                                    </Button>
                                    <p style={{ marginTop: '20px' }}>
                                        Didn't receive the email? <span style={{ color: '#1a237e', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setSubmitted(false)}>Try again</span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default App;