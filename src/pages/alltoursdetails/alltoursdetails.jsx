/**
 * AllToursDetails Page Component
 *
 * Purpose:
 * This page displays the complete tours listing with:
 * - Filter sidebar
 * - Sorting options
 * - Paginated tour results
 *
 * Architecture:
 * - Uses a custom hook (useTourFilters) to manage all filtering,
 *   sorting, pagination, and dynamic options logic.
 * - FilterSidebar is a controlled component.
 * - TourListCard renders individual tour data.
 * - Ant Design Pagination handles page navigation.
 *
 * Notes:
 * - This component does not manage business logic directly.
 * - All filtering and sorting logic is abstracted inside the custom hook.
 */

import React from "react";
import "./alltoursdetails.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { Pagination } from 'antd';
import { useTourFilters } from "./hooks/useTourFilters";
import FilterSidebar from "./components/FilterSidebar";
import TourListCard from "./components/TourListCard";

const AllToursDetails = () => {

    /* ======================================================
       Custom Hook: Centralized Filtering + Sorting + Paging
    ====================================================== */

    const {
        tours,
        dynamicMaxPrice,
        priceRange,
        setPriceRange,
        selectedTypes,
        handleTypeChange,
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
        sortBy,
        setSortBy,
        dynamicOptions,
        handleCheckboxGroupChange,
        currentPage,
        pageSize,
        handlePageChange
    } = useTourFilters();

    /* ======================================================
       Pagination Calculation Logic
    ====================================================== */

    // Calculate index boundaries for slicing tours array
    const indexOfLastTour = currentPage * pageSize;
    const indexOfFirstTour = indexOfLastTour - pageSize;

    // Get only tours for the current page
    const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

    return (
        <>
            {/* =========================
                Global Header
            ========================= */}
            <Header />

            <div className="all-tours-wrapper">
                <div className="all-tours-container">

                    {/* =========================
                        Page Header Section
                    ========================= */}

                    <div className="details-header-section">
                        <div className="details-breadcrumbs">
                            <span className="breadcrumb-links">
                                Home&gt;Tours&gt;Phuket
                            </span>
                            <span className="breadcrumb-info">
                                THE 10 BEST Phuket Tours & Excursions
                            </span>
                        </div>

                        <h1 className="details-page-title">
                            Explore all things to do in Phuket
                        </h1>
                    </div>

                    {/* =========================
                        Main Layout
                        Sidebar + Results
                    ========================= */}

                    <div className="details-main-layout">

                        {/* =========================
                            Sidebar Filters
                        ========================= */}

                        <FilterSidebar
                            selectedTypes={selectedTypes}
                            handleTypeChange={handleTypeChange}
                            dynamicMaxPrice={dynamicMaxPrice}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                            selectedNights={selectedNights}
                            setSelectedNights={setSelectedNights}
                            selectedLanguages={selectedLanguages}
                            setSelectedLanguages={setSelectedLanguages}
                            selectedRating={selectedRating}
                            setSelectedRating={setSelectedRating}
                            selectedSpecials={selectedSpecials}
                            setSelectedSpecials={setSelectedSpecials}
                            dynamicOptions={dynamicOptions}
                            handleCheckboxGroupChange={handleCheckboxGroupChange}
                        />

                        {/* =========================
                            Results Content Area
                        ========================= */}

                        <div className="details-content-area">

                            {/* =========================
                                Toolbar Section
                                Results Count + Sorting
                            ========================= */}

                            <div className="results-toolbar">

                                <span className="results-count">
                                    Showing {tours.length === 0
                                        ? 0
                                        : indexOfFirstTour + 1}
                                    -
                                    {Math.min(indexOfLastTour, tours.length)}
                                    {' '}of {tours.length} tours
                                </span>

                                <div
                                    className="results-sort"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            color: '#666'
                                        }}
                                    >
                                        Sort by:
                                    </span>

                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: '6px',
                                            border: '1px solid #ddd',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <option value="featured">
                                            Featured
                                        </option>
                                        <option value="priceLowHigh">
                                            Price: Low to High
                                        </option>
                                        <option value="priceHighLow">
                                            Price: High to Low
                                        </option>
                                        <option value="rating">
                                            Top Rated
                                        </option>
                                        <option value="reviews">
                                            Most Reviewed
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* =========================
                                Tours List Section
                            ========================= */}

                            <div className="tours-list-container">
                                {currentTours.map((tour) => (
                                    <TourListCard
                                        key={tour.id}
                                        tour={tour}
                                    />
                                ))}
                            </div>

                            {/* =========================
                                Pagination Section
                            ========================= */}

                            {tours.length > 0 && (
                                <div className="custom-pagination-container">
                                    <Pagination
                                        current={currentPage}
                                        total={tours.length}
                                        pageSize={pageSize}
                                        onChange={handlePageChange}
                                        showTotal={(total, range) =>
                                            `${range[0]}-${range[1]} of ${total} items`
                                        }
                                        className="tours-pagination"
                                        showSizeChanger={true}
                                        pageSizeOptions={['5', '10', '20']}
                                    />
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </div>

            {/* =========================
                Global Footer
            ========================= */}
            <Footer />
        </>
    );
};

export default AllToursDetails;