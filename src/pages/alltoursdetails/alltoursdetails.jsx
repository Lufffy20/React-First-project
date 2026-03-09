import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import "./alltoursdetails.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { Pagination, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import AllToursSidebar from "./components/AllToursSidebar";
import AllToursListHeader from "./components/AllToursListHeader";
import AllToursCard from "./components/AllToursCard";
import { useTours } from "../../hooks/useTours";
import { Spin } from "antd";

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
    // We now extract totalTours and fetchTours as well
    const { tours, totalTours, loading, fetchTours } = useTours();

    const dynamicLanguages = useMemo(() => {
        const languages = new Set();
        tours.forEach(tour => {
            if (tour.language) {
                if (Array.isArray(tour.language)) {
                    tour.language.forEach(lang => languages.add(lang));
                } else {
                    languages.add(tour.language);
                }
            }
        });
        return Array.from(languages).sort();
    }, [tours]);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState('featured');

    // Reponsive filter drawer
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

    const showFilterDrawer = () => setIsFilterDrawerOpen(true);
    const closeFilterDrawer = () => setIsFilterDrawerOpen(false);



    const [filters, setFilters] = useState(initialFilters);

    // Fetch tours from backend whenever filters, sort, or pagination changes
    React.useEffect(() => {
        const params = {
            page: currentPage,
            limit: pageSize,
            sortBy: sortBy
        };

        if (filters.tourTypes.length > 0) params.tourType = filters.tourTypes.join(',');
        if (filters.priceRange) {
            params.minPrice = filters.priceRange[0];
            params.maxPrice = filters.priceRange[1];
        }

        // Map days filter (e.g. "3 Days", "5+ Days") to minDays
        if (filters.days.length > 0) {
            // Simplified: just taking the minimum selected day for the backend query
            let minDays = 1000;
            filters.days.forEach(day => {
                if (day === "5+ Days") minDays = Math.min(minDays, 5);
                else {
                    const match = day.match(/(\d+)/);
                    if (match) minDays = Math.min(minDays, parseInt(match[1], 10));
                }
            });
            if (minDays !== 1000) params.minDays = minDays;
        }

        if (filters.minRating > 0) params.minRating = filters.minRating;
        if (filters.languages.length > 0) params.languages = filters.languages.join(',');
        if (filters.specials.length > 0) params.specials = filters.specials.join(',');

        // Note: The nights filter is omitted from backend payload for simplicity, 
        // usually days is enough, but can be added if backend supports it.

        fetchTours({ params });
    }, [filters, sortBy, currentPage, pageSize]);

    const handleFilterChange = useCallback((filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setCurrentPage(1); // Reset to first page on filter change
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', '1');
            return newParams;
        });
    }, [setSearchParams]);

    const handleClearFilters = useCallback(() => {
        setFilters(initialFilters);
        setSortBy('featured');
        setCurrentPage(1);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            newParams.set('page', '1');
            return newParams;
        });
    }, [initialFilters, setSearchParams]);

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setSearchParams(prev => {
            prev.set('page', page);
            return prev;
        });
        if (size !== pageSize) {
            setPageSize(size);
            setCurrentPage(1);
        }
    };

    // The backend now returns exactly the current page's tours
    const currentTours = tours;

    return (
        <>
            <Header />
            <div className="all-tours-wrapper">
                <div className="all-tours-container">

                    {/* Header Section */}
                    <div className="details-header-section">
                        <div className="details-breadcrumbs">
                            <span className="breadcrumb-links">Home&gt;Tours&gt;Phuket</span>
                            <span className="breadcrumb-info">THE 10 BEST Phuket Tours & Excursions</span>
                        </div>
                        <h1 className="details-page-title">Explore all things to do in Phuket</h1>
                    </div>

                    {/* Main Content Layout */}
                    <div className="details-main-layout">

                        {/* Sidebar Filters */}
                        <div className="desktop-sidebar">
                            <AllToursSidebar
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                                availableLanguages={dynamicLanguages}
                            />
                        </div>

                        {/* Mobile Drawer Filter */}
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

                        {/* List/Results Area */}
                        <div className="details-content-area">
                            <div className="mobile-filter-btn-container">
                                <Button type="primary" className="mobile-filter-btn" onClick={showFilterDrawer} icon={<MenuOutlined />}>
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
                                    <div style={{ textAlign: 'center', padding: '50px' }}>
                                        <Spin size="large" description="Loading Tours..." />
                                    </div>
                                ) : (
                                    currentTours.map((tour) => (
                                        <AllToursCard key={tour.id} tour={tour} />
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
                                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
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
