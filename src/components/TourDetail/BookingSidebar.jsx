import React from 'react';
import { Button, Checkbox } from 'antd';
import { MinusOutlined, PlusOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const BookingSidebar = ({ tour }) => {
    return (
        <div className="tour-detail-right-container">
            <p className="tour-detail-price">From <span className="tour-detail-price-amount">${tour.current_price}</span></p>

            <div className="tour-detail-search-container">
                <div className="tour-detail-search-item">
                    <div className="tour-detail-search-icon"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-search-text">
                        <p className="tour-detail-search-label">From</p>
                        <p className="tour-detail-search-value">February 05 ~ March 14</p>
                    </div>
                </div>
                <div className="tour-detail-search-divider"></div>
                <div className="tour-detail-search-item">
                    <div className="tour-detail-search-icon"><ClockCircleOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-search-text">
                        <p className="tour-detail-search-label">Time</p>
                        <p className="tour-detail-search-value">Choose time</p>
                    </div>
                </div>
            </div>

            <div className="tour-detail-tickets-section">
                <h3 className="tour-detail-section-title">Tickets</h3>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Adult (18+ years)</span>
                        <span className="tour-detail-ticket-price">$282.00</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" />
                        <span className="tour-detail-counter-value">3</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" />
                    </div>
                </div>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Youth (13-17 years)</span>
                        <span className="tour-detail-ticket-price">$168.00</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" />
                        <span className="tour-detail-counter-value">2</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" />
                    </div>
                </div>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Children (0-12 years)</span>
                        <span className="tour-detail-ticket-price">$80.00</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" />
                        <span className="tour-detail-counter-value">4</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" />
                    </div>
                </div>
            </div>

            <div className="tour-detail-extra-section">
                <h3 className="tour-detail-section-title">Add Extra</h3>

                <div className="tour-detail-extra-row">
                    <div className="tour-detail-extra-info">
                        <Checkbox className="tour-detail-extra-checkbox">
                            <span className="tour-detail-extra-label">Add Service per booking</span>
                        </Checkbox>
                    </div>
                    <span className="tour-detail-extra-price">$40</span>
                </div>

                <div className="tour-detail-extra-row align-top">
                    <div className="tour-detail-extra-info">
                        <Checkbox className="tour-detail-extra-checkbox" />
                        <div className="tour-detail-extra-text-group">
                            <span className="tour-detail-extra-label">Add Service per person</span>
                            <p className="tour-detail-extra-subtext">Adult: <strong>$17.00</strong> - Youth: <strong>$14.00</strong></p>
                        </div>
                    </div>
                    <span className="tour-detail-extra-price">$40</span>
                </div>
            </div>

            <div className="tour-detail-total-divider"></div>

            <div className="tour-detail-total-section">
                <span className="tour-detail-total-label">Total:</span>
                <span className="tour-detail-total-amount">${tour.current_price}</span>
            </div>

            <Button type="primary" block className="tour-detail-book-btn">Book Now</Button>
        </div>
    );
};

export default BookingSidebar;
