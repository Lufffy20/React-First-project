import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './DualMonthCalendar.css';

const DualMonthCalendar = () => {
    // Start from the current month
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to today

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

                        const isSelected = selectedDate && date.isSame(selectedDate, 'day');
                        const isPast = date.isBefore(dayjs().startOf('day'));

                        return (
                            <div
                                key={date.format('YYYY-MM-DD')}
                                className={`dual-calendar-cell ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
                                onClick={() => !isPast && setSelectedDate(date)}
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
        <div className="dual-calendar-container">
            {renderMonth(currentMonth, true)}
            {renderMonth(nextMonth, false)}
        </div>
    );
};

export default DualMonthCalendar;
