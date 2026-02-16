import React from 'react';
import { Button, Form, Input, Checkbox, Row, Col } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/counter/userSlice';
import SideDesign from '../../components/login/SideDesign';
import './SignupPage.css';

const App = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Signup Data:', values);

        dispatch(addUser({
            id: Date.now(),
            ...values
        }));

        navigate('/login');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="signup-container">
            <div className="ellipse-1 d-none d-lg-block"></div>
            <div className="ellipse-3 d-none d-lg-block"></div>
            <div className="ellipse-2 d-none d-lg-block"></div>
            <div className="group-1171274837-1 d-none d-lg-block"></div>
            <div className="group-1171274837-2 d-none d-lg-block"></div>

            <SideDesign />

            <div className="signup-card">
                <div className="signup-content">
                    <Form
                        name="signup"
                        layout="vertical"
                        style={{ width: '100%' }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
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
                            label="Company Name"
                            name="companyName"
                            rules={[{ required: true, message: 'Please enter your company name!' }]}
                        >
                            <Input placeholder="Search Company" />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please enter your phone number!' }]}
                        >
                            <Input addonBefore="+91" placeholder="Enter Phone Number" />
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
                            <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }}>
                                Sign Up
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            Remembered your password? <Link to="/login"><b>Login Here</b></Link>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default App;
