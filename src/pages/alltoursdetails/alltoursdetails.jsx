/**
 * AllToursDetails Page
 *
 * Purpose:
 * Displays the **All Tours listing page** with filtering, sorting,
 * pagination, and responsive sidebar functionality.
 *
 * Features:
 * - Fetch tours from backend using useTours hook
 * - Dynamic filtering (tour type, price, days, rating, language, specials)
 * - Sorting support
 * - Pagination with URL sync
 * - Responsive filter drawer for mobile
 * - Dynamic breadcrumb and page title
 * - Loading spinner while fetching data
 *
 * Architecture:
 * AllToursDetails
 * ├── Header
 * ├── Sidebar Filters (Desktop + Mobile Drawer)
 * ├── Tour List Header (Sort + Result Count)
 * ├── Tour Cards
 * ├── Pagination
 * └── Footer
 */

import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./alltoursdetails.css";

import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";

import { Pagination, Drawer, Button, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import AllToursSidebar from "./components/AllToursSidebar";
import AllToursListHeader from "./components/AllToursListHeader";
import AllToursCard from "./components/AllToursCard";

import { useTours } from "../../hooks/useTours";



/**
 * Default filters
 */
const initialFilters = {
    tourTypes: [],
    priceRange: [0, 5000],
    days: [],
    nights: [],
    languages: [],
    minRating: 0,
    specials: []
};



const AllToursDetails = () => {

    /**
     * Fetch tours from hook
     */
    const { tours, totalTours, loading, fetchTours } = useTours();



    /**
     * Extract languages dynamically from tours
     */
    const dynamicLanguages = useMemo(() => {

        const languages = new Set();

        tours.forEach(tour => {

            if (tour.language) {

                if (Array.isArray(tour.language)) {
                    tour.language.forEach(lang =>
                        languages.add(lang)
                    );
                } else {
                    languages.add(tour.language);
                }

            }

        });

        return Array.from(languages).sort();

    }, [tours]);



    /**
     * URL Search Params
     */
    const [searchParams, setSearchParams] = useSearchParams();



    const initialPage =
        parseInt(searchParams.get('page')) || 1;

    const [currentPage, setCurrentPage] =
        useState(initialPage);

    const [pageSize, setPageSize] = useState(5);

    const [sortBy, setSortBy] =
        useState('featured');



    /**
     * Mobile filter drawer
     */
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] =
        useState(false);

    const showFilterDrawer =
        () => setIsFilterDrawerOpen(true);

    const closeFilterDrawer =
        () => setIsFilterDrawerOpen(false);



    /**
     * Filters state
     */
    const [filters, setFilters] =
        useState(initialFilters);



    /**
     * Dynamic page information
     */
    const location = searchParams.get('location');

    const displayLocation =
        location || 'All Destinations';

    const tourTypeLabel =
        filters.tourTypes.length > 0
            ? filters.tourTypes.join(' & ')
            : '';



    const breadcrumbLinks =
        location
            ? `Home > Tours > ${location}`
            : 'Home > Tours';



    const breadcrumbInfo =
        `THE ${totalTours} BEST ${location ? location : ''} Tours & Excursions`;



    const pageTitle =
        tourTypeLabel
            ? `Explore ${tourTypeLabel} ${location ? `in ${location}` : ''}`
            : `Explore all things to do ${location ? `in ${location}` : ''}`;



    /**
     * Fetch tours when filters / sorting / pagination changes
     */
    React.useEffect(() => {

        const params = {

            page: currentPage,
            limit: pageSize,
            sortBy: sortBy

        };

        if (location)
            params.location = location;

        if (filters.tourTypes.length > 0)
            params.tourType =
                filters.tourTypes.join(',');

        if (filters.priceRange) {

            params.minPrice =
                filters.priceRange[0];

            params.maxPrice =
                filters.priceRange[1];

        }



        /**
         * Days filter
         */
        if (filters.days.length > 0) {

            let minDays = 1000;

            filters.days.forEach(day => {

                if (day === "5+ Days")
                    minDays = Math.min(minDays, 5);

                else {

                    const match =
                        day.match(/(\d+)/);

                    if (match)
                        minDays =
                            Math.min(
                                minDays,
                                parseInt(match[1], 10)
                            );

                }

            });

            if (minDays !== 1000)
                params.minDays = minDays;

        }



        if (filters.minRating > 0)
            params.minRating =
                filters.minRating;

        if (filters.languages.length > 0)
            params.languages =
                filters.languages.join(',');

        if (filters.specials.length > 0)
            params.specials =
                filters.specials.join(',');



        fetchTours({ params });

    }, [
        filters,
        sortBy,
        currentPage,
        pageSize,
        location
    ]);



    /**
     * Handle filter change
     */
    const handleFilterChange =
        useCallback((filterName, value) => {

            setFilters(prev => ({
                ...prev,
                [filterName]: value
            }));

            setCurrentPage(1);

            setSearchParams(prev => {

                const newParams =
                    new URLSearchParams(prev);

                newParams.set('page', '1');

                return newParams;

            });

        }, [setSearchParams]);



    /**
     * Clear filters
     */
    const handleClearFilters =
        useCallback(() => {

            setFilters(initialFilters);

            setSortBy('featured');

            setCurrentPage(1);

            setSearchParams(prev => {

                const newParams =
                    new URLSearchParams(prev);

                newParams.set('page', '1');

                return newParams;

            });

        }, [setSearchParams]);



    /**
     * Pagination change
     */
    const handlePageChange =
        (page, size) => {

            setCurrentPage(page);

            setSearchParams(prev => {

                const newParams =
                    new URLSearchParams(prev);

                newParams.set('page', page);

                return newParams;

            });

            if (size !== pageSize) {

                setPageSize(size);

                setCurrentPage(1);

            }

        };



    /**
     * Backend already returns current page
     */
    const currentTours = tours;



    return (

        <>
            <Header />

            <div className="all-tours-wrapper">
                <div className="all-tours-container">

                    {/* Page Header */}
                    <div className="details-header-section">

                        <div className="details-breadcrumbs">

                            <span className="breadcrumb-links">
                                {breadcrumbLinks}
                            </span>

                            <span className="breadcrumb-info">
                                {breadcrumbInfo}
                            </span>

                        </div>

                        <h1 className="details-page-title">
                            {pageTitle}
                        </h1>

                    </div>



                    {/* Layout */}
                    <div className="details-main-layout">

                        {/* Desktop Sidebar */}
                        <div className="desktop-sidebar">

                            <AllToursSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                                availableLanguages={dynamicLanguages}
                            />

                        </div>



                        {/* Mobile Drawer */}
                        <Drawer
                            title="Filters"
                            placement="left"
                            onClose={closeFilterDrawer}
                            open={isFilterDrawerOpen}
                            className="mobile-filter-drawer"
                            size="default"
                        >

                            <AllToursSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                                availableLanguages={dynamicLanguages}
                            />

                        </Drawer>



                        {/* Results */}
                        <div className="details-content-area">

                            <div className="mobile-filter-btn-container">

                                <Button
                                    type="primary"
                                    className="mobile-filter-btn"
                                    onClick={showFilterDrawer}
                                    icon={<MenuOutlined />}
                                >
                                    Filters
                                </Button>

                            </div>



                            <AllToursListHeader
                                totalTours={totalTours}
                                indexOfFirstTour={(currentPage - 1) * pageSize}
                                indexOfLastTour={Math.min(currentPage * pageSize, totalTours)}
                                sortBy={sortBy}
                                onSortChange={(val) => setSortBy(val)}
                            />



                            <div className="tours-list-container">

                                {loading ? (

                                    <div style={{
                                        textAlign: 'center',
                                        padding: '50px'
                                    }}>
                                        <Spin size="large" />
                                    </div>

                                ) : (

                                    currentTours.map((tour) => (
                                        <AllToursCard
                                            key={tour.id}
                                            tour={tour}
                                        />
                                    ))

                                )}

                            </div>



                            {totalTours > 0 && (

                                <div className="custom-pagination-container">

                                    <Pagination
                                        current={currentPage}
                                        total={totalTours}
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

            <Footer />
        </>

    );

};



export default AllToursDetails;