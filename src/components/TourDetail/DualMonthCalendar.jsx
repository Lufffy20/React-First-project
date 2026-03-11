/**
 * DualMonthCalendar Component
 *
 * Purpose:
 * Displays a dual-month calendar interface that allows users to view
 * availability and select booking dates for a tour.
 *
 * Features:
 * - Displays two months side by side
 * - Shows booked (sold-out) dates fetched from backend API
 * - Prevents selection of past dates
 * - Allows navigation between months
 * - Highlights selected dates
 * - Displays availability legend
 *
 * Notes:
 * - Uses dayjs for date manipulation and formatting
 * - Booked dates are retrieved using getBookedDatesApi
 * - CSS styling is handled in DualMonthCalendar.css
 */

import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getBookedDatesApi } from '../../helper/functionapi';
import './DualMonthCalendar.css';

const DualMonthCalendar = ({ tourId }) => {

    /**
     * Calendar State
     *
     * currentMonth: determines the left month shown
     * selectedDate: currently selected booking date
     * bookedDates: list of dates already booked (disabled)
     */
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [bookedDates, setBookedDates] = useState([]);

    /**
     * Fetch booked dates when tourId changes
     */
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

    /**
     * Navigation handlers
     * Move calendar to previous or next month
     */
    const handlePrev = () =>
        setCurrentMonth(currentMonth.subtract(1, 'month'));

    const handleNext = () =>
        setCurrentMonth(currentMonth.add(1, 'month'));

    /**
     * Next month reference for the right calendar
     */
    const nextMonth = currentMonth.add(1, 'month');

    /**
     * Generate all day cells for a given month
     * Includes blank placeholders for alignment
     */
    const generateDays = (monthDate) => {

        const startDay = monthDate.startOf('month').day();
        const daysInMonth = monthDate.daysInMonth();
        const days = [];

        // Add empty cells before first day
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Add actual dates
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(monthDate.date(i));
        }

        return days;
    };

    /**
     * Weekday labels
     */
    const weekDays = [
        'Sun', 'Mon', 'Tue',
        'Wed', 'Thu', 'Fri', 'Sat'
    ];

    /**
     * Render a single calendar month
     *
     * isLeft determines if navigation arrows should appear
     */
    const renderMonth = (monthDate, isLeft) => {

        const days = generateDays(monthDate);

        return (
            <div className={`dual-calendar-month ${isLeft ? 'left' : 'right'}`}>

                {/* Calendar Header */}
                <div className="dual-calendar-header">

                    {isLeft
                        ? <LeftOutlined className="nav-icon" onClick={handlePrev} />
                        : <div style={{ width: 14 }}></div>
                    }

                    <span className="month-title">
                        {monthDate.format('MMMM, YYYY')}
                    </span>

                    {!isLeft
                        ? <RightOutlined className="nav-icon" onClick={handleNext} />
                        : <div style={{ width: 14 }}></div>
                    }

                </div>

                {/* Calendar Grid */}
                <div className="dual-calendar-grid">

                    {/* Weekday headers */}
                    {weekDays.map(day => (
                        <div key={day} className="dual-calendar-weekday">
                            {day}
                        </div>
                    ))}

                    {/* Date cells */}
                    {days.map((date, index) => {

                        if (!date) {
                            return (
                                <div
                                    key={`empty-${monthDate.format('MM')}-${index}`}
                                    className="dual-calendar-cell empty"
                                />
                            );
                        }

                        const dateStr = date.format('YYYY-MM-DD');

                        const isSelected =
                            selectedDate &&
                            date.isSame(selectedDate, 'day');

                        const isPast =
                            date.isBefore(dayjs().startOf('day'));

                        const isBooked =
                            bookedDates.includes(dateStr);

                        return (
                            <div
                                key={dateStr}
                                className={`dual-calendar-cell 
                                    ${isSelected ? 'selected' : ''} 
                                    ${isPast ? 'disabled' : ''} 
                                    ${isBooked ? 'booked' : ''}
                                `}
                                onClick={() =>
                                    !isPast &&
                                    !isBooked &&
                                    setSelectedDate(date)
                                }
                                title={isBooked ? 'Sold Out' : ''}
                            >
                                <span className="cell-content">
                                    {date.date()}
                                </span>
                            </div>
                        );

                    })}

                </div>
            </div>
        );
    };

    return (
        <div className="dual-calendar-wrapper">

            {/* Two Month Calendar */}
            <div className="dual-calendar-container">
                {renderMonth(currentMonth, true)}
                {renderMonth(nextMonth, false)}
            </div>

            {/* Legend Section */}
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