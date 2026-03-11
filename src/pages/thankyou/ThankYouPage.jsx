import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result, Card } from 'antd';
import { HomeOutlined, CheckCircleFilled } from '@ant-design/icons';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';

const ThankYouPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div style={{ padding: '80px 20px', backgroundColor: '#f9fafb', minHeight: 'calc(100vh - 200px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card style={{ maxWidth: '600px', width: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                    <Result
                        status="success"
                        icon={<CheckCircleFilled style={{ color: '#05073C', fontSize: '72px' }} />}
                        title={<span style={{ fontSize: '32px', fontWeight: 700, color: '#05073C' }}>Thank You for Your Booking!</span>}
                        subTitle={<p style={{ fontSize: '18px', color: '#64748b' }}>Your payment has been processed successfully. We've sent a confirmation email with all the details of your tour.</p>}
                        extra={[
                            <Button
                                type="primary"
                                key="console"
                                icon={<HomeOutlined />}
                                size="large"
                                onClick={() => navigate('/')}
                                style={{ height: '50px', borderRadius: '8px', fontSize: '16px', backgroundColor: '#05073C', borderColor: '#05073C' }}
                            >
                                Go to Home
                            </Button>
                        ]}
                    />
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default ThankYouPage;
