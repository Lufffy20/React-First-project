/**
 * SignupPage
 *
 * Purpose:
 * Allows new users to create an Annaizu account.
 *
 * Features:
 * - Registration form with validation
 * - First name, last name, phone, email, password inputs
 * - Terms & conditions agreement validation
 * - Uses custom hook `useSignup` for API signup request
 * - Responsive layout with SideDesign illustration panel
 * - Redirect option to login page for existing users
 *
 * Flow:
 * User fills registration form
 *        ↓
 * handleSignup() from useSignup hook
 *        ↓
 * API call to backend signup endpoint
 *        ↓
 * Account created → redirect to login page
 */

import React from 'react';
import { Button, Form, Input, Checkbox, Row, Col, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import SideDesign from '../../components/login/SideDesign';
import { useSignup } from '../../hooks/useAuth';
import './SignupPage.css';

const App = () => {
    const { loading, handleSignup } = useSignup();

    return (
        <div className="signup-container">
            {/* Background design ellipses omitted for brevity in diff but present in file */}
            <Row
                justify="center"
                align="middle"
                gutter={[40, 40]}
                className='signup-row'
            >
                <Col xs={0} sm={0} md={0} lg={12} xl={10}>
                    <SideDesign />
                </Col>

                <Col xs={24} sm={24} md={18} lg={12} xl={10} className='signup-col'>
                    <div className="signup-card">
                        <div className="signup-content">
                            <Form
                                name="signup"
                                layout="vertical"
                                style={{ width: '100%' }}
                                onFinish={handleSignup}
                                autoComplete="off"
                                size="large"
                            >
                                <h2>Register Account</h2>
                                <p>Create Your Annaizu Account - Trusted by Leading Employers.</p>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please enter your first name!' }]}
                                        >
                                            <Input placeholder="Enter First Name" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please enter your last name!' }]}
                                        >
                                            <Input placeholder="Enter Last Name" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="Phone Number"
                                    style={{ marginBottom: 0 }}
                                    required
                                >
                                    <Space.Compact style={{ width: '100%' }}>
                                        <Input style={{ width: '15%', textAlign: 'center' }} defaultValue="+91" disabled />
                                        <Form.Item
                                            name="phoneNumber"
                                            rules={[{ required: true, message: 'Please enter your phone number!' }]}
                                            style={{ width: '85%', marginBottom: '24px' }}
                                        >
                                            <Input placeholder="Enter Phone Number" />
                                        </Form.Item>
                                    </Space.Compact>
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please enter your email!' },
                                        { type: 'email', message: 'Please enter valid email!' }
                                    ]}
                                >
                                    <Input placeholder="Enter Email" />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter your password!' },
                                        { min: 6, message: 'Password must be at least 6 characters!' }
                                    ]}
                                >
                                    <Input.Password placeholder="Enter Password" />
                                </Form.Item>

                                <Form.Item
                                    style={{ textAlign: 'left' }}
                                    name="termsAndConditions"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms')),
                                        },
                                    ]}
                                >
                                    <Checkbox>
                                        I agree to <Link to="/terms-of-service"><b>Terms of Use</b></Link> and{' '}
                                        <Link to="/privacy-policy"><b>Privacy Policy</b></Link>
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        style={{ width: '100%' }}
                                        loading={loading}
                                    >
                                        Sign Up
                                    </Button>
                                </Form.Item>

                                <div style={{ textAlign: 'center' }}>
                                    Remembered your password? <Link to="/login"><b>Login Here</b></Link>
                                </div>

                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default App;