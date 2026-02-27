import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import "./alltoursdetails.css";
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { Pagination, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import AllToursSidebar from "./components/AllToursSidebar";
import AllToursListHeader from "./components/AllToursListHeader";
import AllToursCard from "./components/AllToursCard";

const AllToursDetails = () => {
    const tours = useSelector(state => state.tours.tours || []);

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

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortBy, setSortBy] = useState('featured');

    // Reponsive filter drawer
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

    const showFilterDrawer = () => setIsFilterDrawerOpen(true);
    const closeFilterDrawer = () => setIsFilterDrawerOpen(false);

    const initialFilters = {
        tourTypes: [],
        priceRange: [0, 5000],
        days: [],
        nights: [],
        languages: [],
        minRating: 0,
        specials: []
    };

    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const handleClearFilters = () => {
        setFilters(initialFilters);
        setSortBy('featured');
        setCurrentPage(1);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        if (size !== pageSize) {
            setPageSize(size);
        }
    };

    const filteredTours = useMemo(() => {
        const result = tours.filter(tour => {
            // Tour Type
            if (filters.tourTypes.length > 0 && !filters.tourTypes.includes(tour.type)) {
                return false;
            }

            // Price Range
            if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
                return false;
            }

            // Duration: days
            if (filters.days.length > 0) {
                const daysMatch = tour.duration?.match(/(\d+)\s*Days?/i);
                const tourDays = daysMatch ? parseInt(daysMatch[1], 10) : -1;

                const matchesDay = filters.days.some(day => {
                    if (day === "5+ Days") return tourDays >= 5;
                    const filterNumMatch = day.match(/(\d+)/);
                    if (filterNumMatch) {
                        return tourDays === parseInt(filterNumMatch[1], 10);
                    }
                    return false;
                });
                if (!matchesDay) return false;
            }

            // Duration: nights
            if (filters.nights.length > 0) {
                const nightsMatch = tour.duration?.match(/(\d+)\s*Nights?/i);
                const tourNights = nightsMatch ? parseInt(nightsMatch[1], 10) : -1;

                const matchesNight = filters.nights.some(night => {
                    const filterNumMatch = night.match(/(\d+)/);
                    if (filterNumMatch) {
                        return tourNights === parseInt(filterNumMatch[1], 10);
                    }
                    return false;
                });
                if (!matchesNight) return false;
            }

            // Rating
            if (filters.minRating > 0 && (tour.rating || 0) < filters.minRating) {
                return false;
            }

            // Language
            if (filters.languages.length > 0) {
                if (!tour.language) return false;

                // Check whether tour.language was saved as an Array (from updated form) or String (old format)
                if (Array.isArray(tour.language)) {
                    // Using `some` so if the tour is available in ANY of the selected languages, it will show up
                    const hasSelectedLanguage = filters.languages.some(lang => tour.language.includes(lang));
                    if (!hasSelectedLanguage) return false;
                } else {
                    if (!filters.languages.includes(tour.language)) return false;
                }
            }

            // Specials
            if (filters.specials.length > 0) {
                if (filters.specials.includes("Best Price Guarantee") && !tour.bestPrice) return false;
                if (filters.specials.includes("Free Cancellation") && !tour.freeCancel) return false;
            }

            return true;
        });

        // Sort the result
        return result.sort((a, b) => {
            switch (sortBy) {
                case 'priceLowHigh':
                    return a.price - b.price;
                case 'priceHighLow':
                    return b.price - a.price;
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'reviews':
                    return (b.reviews || 0) - (a.reviews || 0);
                case 'featured':
                default:
                    // Preserve original order or implement specific "featured" logic if you want
                    return 0;
            }
        });
    }, [tours, filters, sortBy]);

    // Pagination logic
    const indexOfLastTour = currentPage * pageSize;
    const indexOfFirstTour = indexOfLastTour - pageSize;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

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
                            width={320}
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
                                totalTours={filteredTours.length}
                                indexOfFirstTour={indexOfFirstTour}
                                indexOfLastTour={indexOfLastTour}
                                sortBy={sortBy}
                                onSortChange={(val) => setSortBy(val)}
                            />

                            <div className="tours-list-container">
                                {currentTours.map((tour) => (
                                    <AllToursCard key={tour.id} tour={tour} />
                                ))}
                            </div>

                            {filteredTours.length > 0 && (
                                <div className="custom-pagination-container">
                                    <Pagination
                                        current={currentPage}
                                        total={filteredTours.length}
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
