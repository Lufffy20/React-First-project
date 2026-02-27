import React from 'react';
import { Flex, Steps, Calendar } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const onPanelChange = (value, mode) => {
    console.log(value, mode);
};

const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
};

const steps = [
    { title: 'Day 1: Airport pickup' },
    { title: 'Day 2: Temples & River Cruise' },
    { title: 'Day 3: Massage & Overnight Train', description: 'Like on all of our trips, we can collect you from the airport when you land and take you directly to your hotel.The first Day is just a check-in Day so you have this freedom to explore the city and get settled in.' },
    { title: 'Day 4: Khao Sok National Park' },
    { title: 'Day 5: Travel to Koh Phangan' },
    { title: 'Day 6: Morning Chill & Muay Thai Lesson' },
    { title: 'Day 7: Island Boat Trip' },
];

const sharedProps = { type: 'dot', current: 0, items: steps };
const sharedVerticalProps = { ...sharedProps, orientation: 'vertical', style: { flex: 'auto' } };

const TourContent = ({ tour }) => {
    return (
        <div className="tour-detail-left-column-content">
            <div className="tour-detail-right-column">
                <div className="tour-detail-feature">
                    <div className="tour-detail-search-icon1"><CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} /></div>
                    <div className="tour-detail-duration">
                        <p>Duration</p>
                        <span>{tour.duration}</span>
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
                        <span>{Array.isArray(tour.language) ? tour.language.join(', ') : tour.language || 'English'}</span>
                    </div>
                </div>
            </div>

            <div className="tour-detail-overview-section">
                <h2>Tour Overview</h2>
                <p>{tour.description || 'The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip whisks you around the islands in one day. Swim over the coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel at Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized in "The Beach." Boat transfers, snacks, buffet lunch, snorkeling equipment, and Phuket hotel pickup and drop-off all included.'}</p>
            </div>

            <div className="tour-detail-highlights-section">
                <h2>Tour Highlights</h2>
                <ul>
                    <li>Experience the thrill of a speedboat to the stunning Phi Phi Islands</li>
                    <li>Be amazed by the variety of marine life in the archepelago</li>
                    <li>Enjoy relaxing in paradise with white sand beaches and azure turquoise water</li>
                    <li>Feel the comfort of a tour limited to 35 passengers</li>
                    <li>Catch a glimpse of the wild monkeys around Monkey Beach</li>
                </ul>
            </div>

            <hr />

            <div className="tour-detail-included-section">
                <h2>What's included</h2>
                <div className="tour-detail-included-list-wrapper">
                    <ul className="tour-detail-included-list-left-column">
                        <li>Beverages, drinking water, morning tea and buffet lunch</li>
                        <li>Local taxes</li>
                        <li>Hotel pickup and drop-off by air-conditioned minivan</li>
                        <li>InsuranceTransfer to a private pier</li>
                        <li>Soft drinks</li>
                        <li>Tour Guide</li>
                    </ul>
                    <ul className="tour-detail-included-list-right-column">
                        <li>Towels</li>
                        <li>Tips</li>
                        <li>Alcoholic Beverages</li>
                    </ul>
                </div>
            </div>

            <hr />

            <div className="tour-detail-itinerary-section">
                <h2>Tour Itinerary</h2>
                <div className="tour-detail-itinerary-content">
                    <Flex vertical gap="middle">
                        <Flex gap="middle">
                            <Steps {...sharedVerticalProps} />
                        </Flex>
                    </Flex>
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
                    <Calendar
                        fullscreen={false}
                        onPanelChange={onPanelChange}
                        disabledDate={disabledDate}
                    />
                </div>
            </div>

            <hr />
        </div>
    );
};

export default TourContent;
