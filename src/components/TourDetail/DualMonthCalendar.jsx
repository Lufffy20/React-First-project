import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getBookedDatesApi } from '../../helper/functionapi';
import './DualMonthCalendar.css';

const DualMonthCalendar = ({ tourId }) => {
    // Start from the current month
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to today
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const fetchBookedDates = async () => {
            if (!tourId) return;
            try {
                const response = await getBookedDatesApi(tourId);
                if (response.data && response.data.success) {
                    setBookedDates(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching booked dates:", error);
            }
        };

        fetchBookedDates();
    }, [tourId]);

    const handlePrev = () => setCurrentMonth(currentMonth.subtract(1, 'month'));
    const handleNext = () => setCurrentMonth(currentMonth.add(1, 'month'));

    const nextMonth = currentMonth.add(1, 'month');

    const generateDays = (monthDate) => {
        const startDay = monthDate.startOf('month').day();
        const daysInMonth = monthDate.daysInMonth();
        const days = [];

        // Fill empty slots for days before the 1st of the month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(monthDate.date(i));
        }

        return days;
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const renderMonth = (monthDate, isLeft) => {
        const days = generateDays(monthDate);

        return (
            <div className={`dual-calendar-month ${isLeft ? 'left' : 'right'}`}>
                <div className="dual-calendar-header">
                    {isLeft ? <LeftOutlined className="nav-icon" onClick={handlePrev} /> : <div style={{ width: 14 }}></div>}
                    <span className="month-title">{monthDate.format('MMMM, YYYY')}</span>
                    {!isLeft ? <RightOutlined className="nav-icon" onClick={handleNext} /> : <div style={{ width: 14 }}></div>}
                </div>
                <div className="dual-calendar-grid">
                    {weekDays.map(day => (
                        <div key={day} className="dual-calendar-weekday">{day}</div>
                    ))}
                    {days.map((date, index) => {
                        if (!date) return <div key={`empty-${monthDate.format('MM')}-${index}`} className="dual-calendar-cell empty"></div>;

                        const dateStr = date.format('YYYY-MM-DD');
                        const isSelected = selectedDate && date.isSame(selectedDate, 'day');
                        const isPast = date.isBefore(dayjs().startOf('day'));
                        const isBooked = bookedDates.includes(dateStr);

                        return (
                            <div
                                key={dateStr}
                                className={`dual-calendar-cell ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''} ${isBooked ? 'booked' : ''}`}
                                onClick={() => !isPast && !isBooked && setSelectedDate(date)}
                                title={isBooked ? 'Sold Out' : ''}
                            >
                                <span className="cell-content">{date.date()}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="dual-calendar-wrapper">
            <div className="dual-calendar-container">
                {renderMonth(currentMonth, true)}
                {renderMonth(nextMonth, false)}
            </div>

            <div className="calendar-legend">
                <div className="legend-item">
                    <div className="legend-color available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color selected"></div>
                    <span>Selected</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color booked"></div>
                    <span>Sold Out</span>
                </div>
            </div>
        </div>
    );
};

export default DualMonthCalendar;
