import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, message, DatePicker, TimePicker } from 'antd';
import { MinusOutlined, PlusOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const BookingSidebar = ({ tour }) => {
    const navigate = useNavigate();

    const [adultCount, setAdultCount] = useState(0);
    const [youthCount, setYouthCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [extraServiceBooking, setExtraServiceBooking] = useState(false);
    const [extraServicePerson, setExtraServicePerson] = useState(false);
    const [selectedDates, setSelectedDates] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);

    // Dynamic ticket prices based on tour.current_price
    const basePrice = tour?.current_price || 0;
    const adultPrice = basePrice;
    const youthPrice = basePrice * 0.6;
    const childPrice = basePrice * 0.3;

    const extraBookingPrice = 40.00;
    const extraAdultPrice = 17.00;
    const extraYouthPrice = 14.00;

    useEffect(() => {
        let total = 0;

        total += adultCount * adultPrice;
        total += youthCount * youthPrice;
        total += childrenCount * childPrice;

        if (extraServiceBooking) {
            total += extraBookingPrice;
        }

        if (extraServicePerson) {
            total += (adultCount * extraAdultPrice) + (youthCount * extraYouthPrice);
        }

        setTotalPrice(total);
    }, [adultCount, youthCount, childrenCount, extraServiceBooking, extraServicePerson, adultPrice, youthPrice, childPrice]);

    const handleBookNow = () => {
        if (adultCount === 0 && youthCount === 0 && childrenCount === 0) {
            message.warning('Please select at least one ticket to book.');
            return;
        }

        if (!selectedDates || !selectedDates[0] || !selectedDates[1]) {
            message.warning('Please select booking dates.');
            return;
        }

        if (!selectedTime) {
            message.warning('Please select a booking time.');
            return;
        }

        const dateRangeStr = `${selectedDates[0].format('MMM DD')} ~ ${selectedDates[1].format('MMM DD')}`;
        const timeStr = selectedTime.format('hh:mm A');

        const bookingData = {
            tourId: tour?.id || 1,
            adultCount,
            youthCount,
            childrenCount,
            extraServiceBooking,
            extraServicePerson,
            totalPrice,
            bookingDate: dateRangeStr, // Save the formatted range, or you can send [0].format('YYYY-MM-DD')
            bookingTime: timeStr,
        };

        navigate('/checkout', { state: { bookingData } });
    };

    return (
        <div className="tour-detail-right-container">
            <p className="tour-detail-price">From <span className="tour-detail-price-amount">${tour?.current_price || 0}</span></p>

            <div className="tour-detail-search-container" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CalendarOutlined style={{ fontSize: '20px', color: '#05073C' }} />
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Starting Date</p>
                        <DatePicker
                            style={{ width: '100%', border: 'none', padding: 0, boxShadow: 'none' }}
                            suffixIcon={null}
                            value={selectedDates ? selectedDates[0] : null}
                            onChange={(date) => {
                                if (!date) {
                                    setSelectedDates(null);
                                    return;
                                }
                                const endDate = date.add((tour?.days || 1) - 1, 'day');
                                setSelectedDates([date, endDate]);
                            }}
                            format="MMM DD"
                            placeholder="Select Start Date"
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                        />
                        {selectedDates && selectedDates[1] && (
                            <p style={{ margin: 0, fontSize: '11px', color: '#05073C', fontWeight: 400 }}>
                                Ends on: {selectedDates[1].format('MMM DD, YYYY')} ({tour?.days || 1} Days)
                            </p>
                        )}
                    </div>
                </div>

                <div style={{ height: '1px', backgroundColor: '#e2e8f0' }}></div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ClockCircleOutlined style={{ fontSize: '20px', color: '#05073C' }} />
                    <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Time</p>
                        <TimePicker
                            style={{ width: '100%', border: 'none', padding: 0, boxShadow: 'none' }}
                            suffixIcon={null}
                            value={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            use12Hours
                            format="hh:mm A"
                            placeholder="Choose time"
                        />
                    </div>
                </div>
            </div>

            <div className="tour-detail-tickets-section">
                <h3 className="tour-detail-section-title">Tickets</h3>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Adult (18+ years)</span>
                        <span className="tour-detail-ticket-price">${adultPrice.toFixed(2)}</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" onClick={() => setAdultCount(Math.max(0, adultCount - 1))} />
                        <span className="tour-detail-counter-value">{adultCount}</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" onClick={() => setAdultCount(adultCount + 1)} />
                    </div>
                </div>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Youth (13-17 years)</span>
                        <span className="tour-detail-ticket-price">${youthPrice.toFixed(2)}</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" onClick={() => setYouthCount(Math.max(0, youthCount - 1))} />
                        <span className="tour-detail-counter-value">{youthCount}</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" onClick={() => setYouthCount(youthCount + 1)} />
                    </div>
                </div>

                <div className="tour-detail-ticket-row">
                    <div className="tour-detail-ticket-info">
                        <span className="tour-detail-ticket-type">Children (0-12 years)</span>
                        <span className="tour-detail-ticket-price">${childPrice.toFixed(2)}</span>
                    </div>
                    <div className="tour-detail-ticket-counter">
                        <Button shape="circle" icon={<MinusOutlined />} className="tour-detail-counter-btn" onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))} />
                        <span className="tour-detail-counter-value">{childrenCount}</span>
                        <Button shape="circle" icon={<PlusOutlined />} className="tour-detail-counter-btn" onClick={() => setChildrenCount(childrenCount + 1)} />
                    </div>
                </div>
            </div>

            <div className="tour-detail-extra-section">
                <h3 className="tour-detail-section-title">Add Extra</h3>

                <div className="tour-detail-extra-row">
                    <div className="tour-detail-extra-info">
                        <Checkbox className="tour-detail-extra-checkbox" checked={extraServiceBooking} onChange={(e) => setExtraServiceBooking(e.target.checked)}>
                            <span className="tour-detail-extra-label">Add Service per booking</span>
                        </Checkbox>
                    </div>
                    <span className="tour-detail-extra-price">${extraBookingPrice}</span>
                </div>

                <div className="tour-detail-extra-row align-top">
                    <div className="tour-detail-extra-info">
                        <Checkbox className="tour-detail-extra-checkbox" checked={extraServicePerson} onChange={(e) => setExtraServicePerson(e.target.checked)} />
                        <div className="tour-detail-extra-text-group">
                            <span className="tour-detail-extra-label">Add Service per person</span>
                            <p className="tour-detail-extra-subtext">Adult: <strong>${extraAdultPrice.toFixed(2)}</strong> - Youth: <strong>${extraYouthPrice.toFixed(2)}</strong></p>
                        </div>
                    </div>
                    <span className="tour-detail-extra-price">${extraBookingPrice}</span>
                </div>
            </div>

            <div className="tour-detail-total-divider"></div>

            <div className="tour-detail-total-section">
                <span className="tour-detail-total-label">Total:</span>
                <span className="tour-detail-total-amount">${totalPrice.toFixed(2)}</span>
            </div>

            <Button type="primary" block className="tour-detail-book-btn" onClick={handleBookNow}>Book Now</Button>
        </div>
    );
};

export default BookingSidebar;