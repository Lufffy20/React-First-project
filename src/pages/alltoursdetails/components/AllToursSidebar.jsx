/**
 * AllToursSidebar Component
 *
 * Purpose:
 * Displays the **filter sidebar** for the All Tours page.
 * Users can filter tours by date, tour type, price, duration,
 * language, and rating.
 *
 * Features:
 * - Expandable checkbox groups (Read More / Show Less)
 * - Debounced price slider filter (3 seconds)
 * - Dynamic languages from backend tours
 * - Clear all filters
 * - Date range picker
 * - Responsive compatible (used in Drawer for mobile)
 *
 * Props:
 * filters            → current filters object
 * onFilterChange     → function to update filter values
 * onClearFilters     → reset filters
 * availableLanguages → dynamically generated languages
 */

import React, { useState, useEffect } from "react";
import { Checkbox, Slider, Rate, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;



/**
 * Static Filter Options
 */
const tourTypesOptions = [
    "Nature Tours",
    "Adventure Tours",
    "Cultural Tours",
    "Food Tours",
    "City Tours",
    "Cruises Tours"
];

const daysOptions = [
    "1 Day",
    "2 Days",
    "3 Days",
    "4 Days",
    "5+ Days",
    "11 Days"
];

const nightsOptions = [
    "0 Nights",
    "1 Night",
    "2 Nights",
    "3 Nights",
    "4 Nights",
    "10 Nights"
];

const specialsOptions = [
    "Best Price Guarantee",
    "Free Cancellation"
];



/**
 * ExpandableCheckboxGroup
 *
 * Handles checkbox lists that can expand
 * when there are many options.
 */

const ExpandableCheckboxGroup = ({
    options,
    value,
    onChange,
    className
}) => {

    const [expanded, setExpanded] = useState(false);

    const showReadMore = options.length > 5;

    const visibleOptions =
        expanded ? options : options.slice(0, 5);



    return (

        <div className="expandable-checkbox-container">

            <Checkbox.Group
                options={visibleOptions}
                value={value}
                onChange={onChange}
                className={className}
            />

            {showReadMore && (

                <a
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        display: 'inline-block',
                        marginTop: '10px',
                        color: '#eb6e34',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'underline'
                    }}
                >
                    {expanded ? '- Show Less' : '+ Read More'}
                </a>

            )}

        </div>

    );

};



/**
 * Main Sidebar Component
 */

const AllToursSidebar = ({
    filters,
    onFilterChange,
    onClearFilters,
    availableLanguages = []
}) => {

    /**
     * Local price state (for debounce)
     */
    const [localPriceRange, setLocalPriceRange] =
        useState(filters.priceRange);



    /**
     * Sync with parent filters
     */
    useEffect(() => {

        setLocalPriceRange(filters.priceRange);

    }, [filters.priceRange]);



    /**
     * Debounce price filter
     * Waits 3 seconds before sending update
     */

    useEffect(() => {

        if (
            localPriceRange[0] === filters.priceRange[0] &&
            localPriceRange[1] === filters.priceRange[1]
        ) {
            return;
        }

        const handler = setTimeout(() => {

            onFilterChange('priceRange', localPriceRange);

        }, 3000);

        return () => clearTimeout(handler);

    }, [
        localPriceRange,
        onFilterChange,
        filters.priceRange
    ]);



    return (

        <aside className="details-sidebar">

            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >

                <h3
                    style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}
                >
                    Filters
                </h3>

                <Button
                    type="link"
                    onClick={onClearFilters}
                    style={{
                        padding: 0,
                        color: '#1f2937'
                    }}
                >
                    Clear All
                </Button>

            </div>



            {/* Travel Date */}
            <div className="filter-box filter-travel-date">

                <h3>When are you traveling?</h3>

                <div className="date-input-container">

                    <RangePicker
                        className="date-range-picker custom-range-picker"
                        disabledDate={(current) =>
                            current &&
                            current < dayjs().startOf('day')
                        }
                        format="MMMM DD"
                        separator="~"
                        suffixIcon={null}
                    />

                </div>

            </div>



            {/* Tour Type */}
            <div className="filter-box filter-tour-type">

                <h3>Tour Type</h3>

                <ExpandableCheckboxGroup
                    options={tourTypesOptions}
                    value={filters.tourTypes}
                    onChange={(values) =>
                        onFilterChange('tourTypes', values)
                    }
                    className="filter-checkbox-group"
                />

            </div>



            {/* Price Filter */}
            <div className="filter-box filter-accordion">

                <h3>Filter Price</h3>

                <div className="filter-price-slider">

                    <Slider
                        range
                        max={5000}
                        tooltip={{
                            formatter: (value) => `$${value}`
                        }}
                        value={localPriceRange}
                        onChange={(value) =>
                            setLocalPriceRange(value)
                        }
                        defaultValue={[0, 5000]}
                    />

                    <div className="filter-price-labels">
                        <span>$0</span>
                        <span>$5000</span>
                    </div>

                </div>

            </div>



            {/* Duration */}
            <div className="filter-box filter-accordion">

                <h3>Duration</h3>

                <div className="filter-duration-container">

                    {/* Days */}
                    <div className="filter-duration-column">

                        <h4 className="filter-duration-title">
                            Days
                        </h4>

                        <ExpandableCheckboxGroup
                            options={daysOptions}
                            value={filters.days}
                            onChange={(values) =>
                                onFilterChange('days', values)
                            }
                            className="filter-checkbox-group"
                        />

                    </div>



                    {/* Nights */}
                    <div className="filter-duration-column">

                        <h4 className="filter-duration-title">
                            Nights
                        </h4>

                        <ExpandableCheckboxGroup
                            options={nightsOptions}
                            value={filters.nights}
                            onChange={(values) =>
                                onFilterChange('nights', values)
                            }
                            className="filter-checkbox-group"
                        />

                    </div>

                </div>

            </div>



            {/* Language */}
            <div className="filter-box filter-accordion">

                <h3>Language</h3>

                {availableLanguages.length > 0 ? (

                    <ExpandableCheckboxGroup
                        options={availableLanguages}
                        value={filters.languages}
                        onChange={(values) =>
                            onFilterChange('languages', values)
                        }
                        className="filter-checkbox-group"
                    />

                ) : (

                    <div
                        style={{
                            padding: '10px 0',
                            color: '#888',
                            fontSize: '14px'
                        }}
                    >
                        No languages currently available
                    </div>

                )}

            </div>



            {/* Rating */}
            <div className="filter-box filter-accordion">

                <h3>Rating</h3>

                <div className="filter-rating-container">

                    <span className="filter-rating-label">
                        Min rating: 0 & Up
                    </span>

                    <Rate
                        allowHalf
                        value={filters.minRating}
                        onChange={(value) =>
                            onFilterChange('minRating', value)
                        }
                        className="filter-rate-stars"
                    />

                </div>

            </div>

        </aside>

    );

};

export default AllToursSidebar;