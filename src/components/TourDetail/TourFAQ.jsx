import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const TourFAQ = ({ faqs }) => {
    return (
        <div className="tour-detail-faq-section">
            <h2>FAQ</h2>
            <div className="tour-detail-faq-item">
                {faqs && faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                        <div key={faq.id || index} style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>{faq.question}</p>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>{faq.answer}</p>
                            </div>
                            <div className="tour-detail-faq-icon" style={{ marginLeft: '20px' }}>
                                <UserOutlined style={{ fontSize: '24px', color: '#EB662B' }} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No FAQs available for this tour.</p>
                )}
            </div>
        </div>
    );
};

export default TourFAQ;
