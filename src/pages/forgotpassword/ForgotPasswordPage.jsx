import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import SideDesign from '../../components/login/SideDesign';
import './ForgotPasswordPage.css';

const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
const App = () => (
    <div className="forgot-password-container">
        <div className="ellipse-1 d-none d-lg-block"></div>
        <div className="ellipse-3 d-none d-lg-block"></div>
        <div className="ellipse-2 d-none d-lg-block"></div>
        <div className="group-1171274837-1 d-none d-lg-block"></div>
        <div className="group-1171274837-2 d-none d-lg-block"></div>
        <SideDesign />
        <div className="forgot-password-card">
            <div className="forgot-password-content">
                <Form
                    name="basic"
                    layout="vertical"
                    style={{ width: '100%' }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', borderRadius: '50px' }}>
                            Send Reset Link
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            Remembered your password? <Link to="/login" style={{ textDecoration: 'underline', color: '#1a237e', fontWeight: 'bold' }}>Login here</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
);
export default App;