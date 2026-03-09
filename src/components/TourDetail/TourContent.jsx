import React from 'react';
import { Flex, Steps, Row, Col } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import DualMonthCalendar from './DualMonthCalendar';

// Steps removed as they are now dynamic

const TourContent = ({ tour }) => {
    return (
        <div className="tour-detail-left-column-content">
            <div className="tour-detail-right-column">
                <div className="tour-detail-feature">
                    <div className="tour-detail-search-icon1"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-duration">
                        <p>Duration</p>
                        <span>{tour.days || 0} Days {tour.nights || 0} Nights</span>
                    </div>
                </div>

                <div className="tour-detail-feature">
                    <div className="tour-detail-search-icon1"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-group-size">
                        <p>Group Size</p>
                        <span>10 people</span>
                    </div>
                </div>

                <div className="tour-detail-feature">
                    <div className="tour-detail-search-icon1"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-ages">
                        <p>Ages</p>
                        <span>18-99 yrs</span>
                    </div>
                </div>

                <div className="tour-detail-feature">
                    <div className="tour-detail-search-icon1"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-languages">
                        <p>Languages</p>
                        <span>{Array.isArray(tour.tour_language) ? tour.tour_language.join(', ') : tour.tour_language || 'English'}</span>
                    </div>
                </div>
            </div>

            <div className="tour-detail-overview-section">
                <h2>Tour Overview</h2>
                <p>{tour.description}</p>
            </div>

            {/* Inclusions and Exclusions */}
            <hr />
            <div className="tour-detail-included-section">
                <Row gutter={32}>
                    <Col xs={24} md={12}>
                        <h2>What's included</h2>
                        <ul className="tour-detail-included-list-left-column" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                            {tour.inclusions && tour.inclusions.length > 0 ? (
                                tour.inclusions.map((inc, i) => <li key={inc.id || i}>{inc.item}</li>)
                            ) : (
                                <li>Standard Inclusions</li>
                            )}
                        </ul>
                    </Col>
                    <Col xs={24} md={12}>
                        <h2>What's excluded</h2>
                        <ul className="tour-detail-included-list-right-column" style={{ listStyleType: 'circle', paddingLeft: '20px', color: '#666' }}>
                            {tour.exclusions && tour.exclusions.length > 0 ? (
                                tour.exclusions.map((exc, i) => <li key={exc.id || i}>{exc.item}</li>)
                            ) : (
                                <li>Standard Exclusions</li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </div>

            <hr />

            <div className="tour-detail-itinerary-section">
                <h2>Tour Itinerary</h2>
                <div className="tour-detail-itinerary-content">
                    {tour.itineraries && tour.itineraries.length > 0 ? (
                        <Flex vertical gap="middle">
                            <Steps
                                direction="vertical"
                                current={-1}
                                items={tour.itineraries
                                    .sort((a, b) => a.day_number - b.day_number)
                                    .map(item => ({
                                        title: `Day ${item.day_number}: ${item.title}`,
                                        description: item.description
                                    }))
                                }
                            />
                        </Flex>
                    ) : (
                        <p>Itinerary details coming soon.</p>
                    )}
                </div>
            </div>

            <div className="tour-detail-map-section">
                <h2>Tour Map</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999706602396!2d2.292292615674315!3d48.85837307928756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdebfbf6f59%3A0x4e3c0a3d1b6c8b8!2sEiffel%20Tower!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    title="Tour Map"
                ></iframe>
            </div>

            <hr />

            <div className="tour-detail-availability-calendar-section">
                <h2>Availability Calendar</h2>
                <div className="tour-detail-availability-calendar-content">
                    <DualMonthCalendar />
                </div>
            </div>

            <hr />
        </div>
    );
};

export default TourContent;
