import React from 'react';
import { Button, Checkbox, Form, Input, message, Row, Col } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { useLogin } from '../../hooks/useAuth';
import './LoginPage.css';
import SideDesign from '../../components/login/SideDesign';

const App = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { loading, handleLogin } = useLogin();

    // Check if user just verified their email
    React.useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            message.success("Email verified successfully! You can now login. 🎉");
            // URL se verified parameter hata dete hain taaki refresh hone par message wapas na aaye
            searchParams.delete('verified');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    return (
        <div className="container">
            <div className="ellipse-1 d-none d-lg-block"></div>
            <div className="ellipse-3 d-none d-lg-block"></div>
            <div className="ellipse-2 d-none d-lg-block"></div>
            <div className="group-1171274837-1 d-none d-lg-block"></div>
            <div className="group-1171274837-2 d-none d-lg-block"></div>

            <Row
                justify="center"
                align="middle"
                gutter={[40, 40]}
                className='login-row'
            >
                <Col xs={0} sm={0} md={0} lg={12} xl={10}>
                    <SideDesign />
                </Col>


                <Col xs={24} sm={24} md={18} lg={12} xl={10} className='login-col'>
                    <div className="card">
                        <div className="content">
                            <Form
                                name="basic"
                                layout="vertical"
                                style={{ width: '100%' }}
                                initialValues={{ remember: true }}
                                onFinish={handleLogin}
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
                                        loading={loading}
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
                </Col>
            </Row>
        </div>
    );
};

export default App;
