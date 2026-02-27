import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const TourFAQ = () => {
    return (
        <div className="tour-detail-faq-section">
            <h2>FAQ</h2>
            <div className="tour-detail-faq-item">
                <div className="tour-detail-faq-refund">
                    <div>
                        <p style={{ fontWeight: 500 }}>Can I get the refund?</p>
                        <p>Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat cancellation policy: For a full refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat</p>
                    </div>
                    <div className="tour-detail-faq-icon">
                        <UserOutlined style={{ fontSize: '24px', color: '#EB662B' }} />
                    </div>
                </div>

                <div className="tour-detail-faq-change-date">
                    <div>
                        <p style={{ fontWeight: 500 }}>Can I change the travel date?</p>
                    </div>
                    <div className="tour-detail-faq-icon">
                        <UserOutlined style={{ fontSize: '24px', color: '#EB662B' }} />
                    </div>
                </div>

                <div className="tour-detail-faq-end">
                    <div>
                        <p style={{ fontWeight: 500 }}>When and where does the tour end?</p>
                    </div>
                    <div className="tour-detail-faq-icon">
                        <UserOutlined style={{ fontSize: '24px', color: '#EB662B' }} />
                    </div>
                </div>

                <div className="tour-detail-faq-airport">
                    <div>
                        <p style={{ fontWeight: 500 }}>Do you arrange airport transfers?</p>
                    </div>
                    <div className="tour-detail-faq-icon">
                        <UserOutlined style={{ fontSize: '24px', color: '#EB662B' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourFAQ;
