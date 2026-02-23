/**
 * FilterSidebar Component
 *
 * Purpose:
 * This component renders the complete filter sidebar used in the tours listing page.
 * It allows users to filter tours based on:
 * - Travel Date
 * - Tour Type
 * - Price Range
 * - Duration (Days & Nights)
 * - Language
 * - Rating
 * - Special Features
 *
 * Notes:
 * - All filter state is controlled from parent component.
 * - This component is purely presentational and uses props for state management.
 * - Ant Design components are used for UI controls.
 */

import React, { useState } from "react";
import { Slider, Checkbox, Rate, DatePicker } from 'antd';
import dayjs from 'dayjs';

// Destructure RangePicker from Ant Design DatePicker
const { RangePicker } = DatePicker;

const FilterSidebar = ({

    /* ============================
       Controlled State Props
    ============================ */

    selectedTypes,
    handleTypeChange,

    dynamicMaxPrice,
    priceRange,
    setPriceRange,

    selectedDays,
    setSelectedDays,

    selectedNights,
    setSelectedNights,

    selectedLanguages,
    setSelectedLanguages,

    selectedRating,
    setSelectedRating,

    selectedSpecials,
    setSelectedSpecials,

    dynamicOptions,
    handleCheckboxGroupChange

}) => {

    /* ============================
       Local UI Toggle States
       Used for "See More / See Less"
    ============================ */

    const [showAllLanguages, setShowAllLanguages] = useState(false);
    const [showAllDays, setShowAllDays] = useState(false);
    const [showAllNights, setShowAllNights] = useState(false);
    const [showAllTourTypes, setShowAllTourTypes] = useState(false);

    /* ============================
       Dynamic Options
       Passed from parent component
    ============================ */

    const {
        languageOptions,
        daysOptions,
        nightsOptions,
        specialsOptions
    } = dynamicOptions;

    /* ============================
       Static Tour Types
    ============================ */

    const tourTypesOptions = [
        "Nature Tours",
        "Adventure Tours",
        "Cultural Tours",
        "Food Tours",
        "City Tours",
        "Cruises Tours",
        "Beach Tours"
    ];

    return (

        <aside className="details-sidebar">

            {/* ============================
                Travel Date Filter
            ============================ */}

            <div className="filter-box filter-travel-date">
                <h3>When are you traveling?</h3>

                <div className="date-input-container">
                    <RangePicker
                        style={{ width: '100%' }}

                        // Disable past dates
                        disabledDate={(current) =>
                            current && current < dayjs().startOf('day')
                        }
                    />
                </div>
            </div>

            {/* ============================
                Tour Type Filter
            ============================ */}

            <div className="filter-box filter-tour-type">
                <h3>Tour Type</h3>

                <ul className="checkbox-list">

                    {(showAllTourTypes
                        ? tourTypesOptions
                        : tourTypesOptions.slice(0, 5)
                    ).map((type) => (

                        <li key={type}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                {type}
                            </label>
                        </li>
                    ))}

                </ul>

                {tourTypesOptions.length > 5 && (
                    <button
                        className="see-more-btn"
                        onClick={() =>
                            setShowAllTourTypes(!showAllTourTypes)
                        }
                    >
                        {showAllTourTypes ? 'See Less' : 'See More'}
                    </button>
                )}
            </div>

            {/* ============================
                Price Filter
            ============================ */}

            <div className="filter-box filter-accordion">
                <h3>Filter Price</h3>

                <div style={{ padding: '0 10px' }}>
                    <Slider
                        range
                        defaultValue={[0, dynamicMaxPrice]}
                        max={dynamicMaxPrice}
                        onChange={(value) => setPriceRange(value)}
                        tooltip={{
                            formatter: (value) => `$${value}`
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            color: '#666'
                        }}
                    >
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* ============================
                Duration Filter
                Days & Nights
            ============================ */}

            <div className="filter-box filter-accordion">
                <h3>Duration</h3>

                <div style={{ display: 'flex', gap: '30px' }}>

                    {/* Days Section */}
                    <div style={{ flex: 1 }}>
                        <h4
                            style={{
                                fontSize: '14px',
                                marginBottom: '10px',
                                color: '#555',
                                fontWeight: '600'
                            }}
                        >
                            Days
                        </h4>

                        <Checkbox.Group
                            options={showAllDays
                                ? daysOptions
                                : daysOptions.slice(0, 5)
                            }
                            value={selectedDays}
                            onChange={(values) =>
                                handleCheckboxGroupChange(values, setSelectedDays)
                            }
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        />

                        {daysOptions.length > 5 && (
                            <button
                                className="see-more-btn"
                                onClick={() =>
                                    setShowAllDays(!showAllDays)
                                }
                                style={{
                                    marginTop: '10px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff6b35',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                {showAllDays ? 'See Less' : 'See More'}
                            </button>
                        )}
                    </div>

                    {/* Nights Section */}
                    <div style={{ flex: 1 }}>
                        <h4
                            style={{
                                fontSize: '14px',
                                marginBottom: '10px',
                                color: '#555',
                                fontWeight: '600'
                            }}
                        >
                            Nights
                        </h4>

                        <Checkbox.Group
                            options={showAllNights
                                ? nightsOptions
                                : nightsOptions.slice(0, 5)
                            }
                            value={selectedNights}
                            onChange={(values) =>
                                handleCheckboxGroupChange(values, setSelectedNights)
                            }
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        />

                        {nightsOptions.length > 5 && (
                            <button
                                className="see-more-btn"
                                onClick={() =>
                                    setShowAllNights(!showAllNights)
                                }
                                style={{
                                    marginTop: '10px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#ff6b35',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                {showAllNights ? 'See Less' : 'See More'}
                            </button>
                        )}
                    </div>

                </div>
            </div>

            {/* ============================
                Language Filter
            ============================ */}

            <div className="filter-box filter-accordion">
                <h3>Language</h3>

                <Checkbox.Group
                    options={showAllLanguages
                        ? languageOptions
                        : languageOptions.slice(0, 5)
                    }
                    value={selectedLanguages}
                    onChange={(values) =>
                        handleCheckboxGroupChange(values, setSelectedLanguages)
                    }
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                />

                {languageOptions.length > 5 && (
                    <button
                        className="see-more-btn"
                        onClick={() =>
                            setShowAllLanguages(!showAllLanguages)
                        }
                        style={{
                            marginTop: '10px',
                            background: 'none',
                            border: 'none',
                            color: '#ff6b35',
                            cursor: 'pointer',
                            padding: 0
                        }}
                    >
                        {showAllLanguages ? 'See Less' : 'See More'}
                    </button>
                )}
            </div>

            {/* ============================
                Rating Filter
            ============================ */}

            <div className="filter-box filter-accordion">
                <h3>Rating</h3>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                        style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px'
                        }}
                    >
                        Min rating: {selectedRating} & Up
                    </span>

                    <Rate
                        allowHalf
                        value={selectedRating}
                        onChange={setSelectedRating}
                        style={{ color: '#f05a22' }}
                    />
                </div>
            </div>

            {/* ============================
                Specials Filter
            ============================ */}

            <div className="filter-box filter-accordion">
                <h3>Specials</h3>

                <Checkbox.Group
                    options={specialsOptions}
                    value={selectedSpecials}
                    onChange={(values) =>
                        handleCheckboxGroupChange(values, setSelectedSpecials)
                    }
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                />
            </div>

        </aside>
    );
};

export default FilterSidebar;