import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './LoginPage.css';
import SideDesign from '../../components/login/SideDesign';

const App = () => {

    const users = useSelector((state) => state.user.users);
    const navigate = useNavigate();

    const onFinish = (values) => {

        const foundUser = users.find(
            (user) =>
                user.email === values.email &&
                user.password === values.password
        );

        if (foundUser) {
            message.success("Login Successful 🎉");
            navigate("/dashboard");
        } else {
            message.error("Invalid email or password");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <div className="ellipse-1 d-none d-lg-block"></div>
            <div className="ellipse-3 d-none d-lg-block"></div>
            <div className="ellipse-2 d-none d-lg-block"></div>
            <div className="group-1171274837-1 d-none d-lg-block"></div>
            <div className="group-1171274837-2 d-none d-lg-block"></div>

            <SideDesign />

            <div className="card">
                <div className="content">
                    <Form
                        name="basic"
                        layout="vertical"
                        style={{ width: '100%' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <h2>Hello 👋, Welcome Back!</h2>
                        <p>Enter your credentials and click <strong>'Sign In'</strong> to access the Annaizu Dashboard.</p>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email!' }]}
                        >
                            <Input placeholder="Enter Email" size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password placeholder="Enter Password" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <div className="remember-forgot">
                                <Checkbox>Remember me</Checkbox>
                                <Link style={{ textDecoration: 'underline' }} to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className='btn btn-primary'
                                type="primary"
                                htmlType="submit"
                                size="large"
                                style={{ width: '100%' }}
                            >
                                Sign In
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="btn btn-small"
                                size="large"
                            >
                                Office Login
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <div style={{ textAlign: 'center' }}>
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <div style={{ textAlign: 'center' }}>
                                <Link to="/privacy-policy">Privacy Policy</Link> · <Link to="/terms-of-service">Terms of Service</Link>
                            </div>
                        </Form.Item>

                        <p style={{ textAlign: 'center' }}>
                            2025 © I Telenet Engineering Solution Ltd
                        </p>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default App;
