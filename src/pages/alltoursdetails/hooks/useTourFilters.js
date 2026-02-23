/**
 * useTourFilters Custom Hook
 *
 * Purpose:
 * Centralized hook that manages:
 * - Tour filtering logic
 * - Dynamic filter option generation
 * - Sorting
 * - Pagination
 *
 * Architecture Notes:
 * - Fetches base tour data from Redux store
 * - Applies layered filtering logic
 * - Applies sorting
 * - Resets pagination when filters change
 * - Dynamically generates filter options from available data
 *
 * This hook keeps UI components clean and focuses all
 * business logic in one place.
 */

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useTourFilters = () => {

    /* ======================================================
       Base Data Source (Redux Store)
    ====================================================== */

    const allTours = useSelector((state) => state.tours.tours) || [];

    /* ======================================================
       Core Filtered State
    ====================================================== */

    const [tours, setTours] = useState(allTours);

    const [selectedTypes, setSelectedTypes] = useState([]);

    /* ================= Pagination ================= */

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    /* ================= Price Filter ================= */

    const dynamicMaxPrice = allTours.length > 0
        ? Math.max(
            ...allTours.map(tour => {
                const tourPrice =
                    typeof tour.price === 'number'
                        ? tour.price
                        : parseFloat(
                            (tour.price || "0")
                                .toString()
                                .replace(/[^0-9.]/g, '')
                        );

                return isNaN(tourPrice) ? 0 : tourPrice;
            })
        )
        : 1000;

    const [priceRange, setPriceRange] = useState([0, dynamicMaxPrice]);

    /* ================= Other Filters ================= */

    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedNights, setSelectedNights] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedSpecials, setSelectedSpecials] = useState([]);

    /* ================= Sorting ================= */

    const [sortBy, setSortBy] = useState('featured');

    /* ======================================================
       Main Filtering + Sorting Effect
    ====================================================== */

    useEffect(() => {

        let filtered = [...allTours];

        /* 1. Tour Type Filter */
        if (selectedTypes.length > 0) {
            filtered = filtered.filter(tour =>
                selectedTypes.includes(tour.type)
            );
        }

        /* 2. Price Filter */
        filtered = filtered.filter(tour => {
            const tourPrice =
                typeof tour.price === 'number'
                    ? tour.price
                    : parseFloat(
                        (tour.price || "0")
                            .toString()
                            .replace(/[^0-9.]/g, '')
                    );

            return (
                tourPrice >= priceRange[0] &&
                tourPrice <= priceRange[1]
            );
        });

        /* 3. Days Filter */
        if (selectedDays.length > 0) {
            filtered = filtered.filter(tour => {
                const match = tour.duration?.match(/^(\d+)\s*Days?/i);
                if (!match) return false;

                const days = parseInt(match[1]);

                return selectedDays.some(dayFilter => {
                    if (dayFilter === "5+ Days") return days >= 5;
                    if (
                        dayFilter === `${days} Days` ||
                        dayFilter === `${days} Day`
                    ) return true;

                    return false;
                });
            });
        }

        /* 4. Nights Filter */
        if (selectedNights.length > 0) {
            filtered = filtered.filter(tour => {
                const match = tour.duration?.match(/(\d+)\s*Nights?/i);
                const nights = match ? parseInt(match[1]) : 0;

                return selectedNights.some(nightFilter => {
                    if (nightFilter === "0 Nights") return nights === 0;
                    if (nightFilter === "5+ Nights") return nights >= 5;
                    if (
                        nightFilter === `${nights} Nights` ||
                        nightFilter === `${nights} Night`
                    ) return true;

                    return false;
                });
            });
        }

        /* 5. Language Filter */
        if (selectedLanguages.length > 0) {
            filtered = filtered.filter(tour =>
                selectedLanguages.some(lang =>
                    tour.language
                        ?.toLowerCase()
                        .includes(lang.toLowerCase())
                )
            );
        }

        /* 6. Rating Filter */
        if (selectedRating > 0) {
            filtered = filtered.filter(tour => {
                const tourRating =
                    typeof tour.rating === 'number'
                        ? tour.rating
                        : parseFloat(tour.rating || "0");

                return tourRating >= selectedRating;
            });
        }

        /* 7. Specials Filter */
        if (selectedSpecials.length > 0) {
            filtered = filtered.filter(tour =>
                selectedSpecials.some(special => {

                    if (special === "Best Price Guarantee" && tour.bestPrice)
                        return true;

                    if (special === "Free Cancellation" && tour.freeCancel)
                        return true;

                    if (special === "Special Offers" && tour.badge) {
                        const badgeLower = tour.badge.toLowerCase();
                        return (
                            badgeLower.includes('off') ||
                            badgeLower.includes('%') ||
                            badgeLower.includes('festival') ||
                            badgeLower.includes('discount') ||
                            badgeLower.includes('deal')
                        );
                    }

                    if (tour.badge === special) return true;

                    return false;
                })
            );
        }

        /* 8. Sorting */
        if (sortBy === 'priceLowHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHighLow') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'reviews') {
            filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        }

        setTours(filtered);
        setCurrentPage(1);

    }, [
        allTours,
        selectedTypes,
        priceRange,
        selectedDays,
        selectedNights,
        selectedLanguages,
        selectedRating,
        selectedSpecials,
        sortBy
    ]);

    /* ======================================================
       Handlers
    ====================================================== */

    const handleTypeChange = (type) => {
        let updated = [...selectedTypes];

        if (updated.includes(type)) {
            updated = updated.filter(t => t !== type);
        } else {
            updated.push(type);
        }

        setSelectedTypes(updated);
    };

    const handleCheckboxGroupChange = (checkedValues, setFilterState) => {
        setFilterState(checkedValues);
    };

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        if (size !== pageSize) {
            setPageSize(size);
        }
    };

    /* ======================================================
       Dynamic Filter Options Generator
    ====================================================== */

    const getDynamicOptions = () => {

        const languages = new Set(["English", "Hindi", "Spanish", "French"]);
        const days = new Set(["1 Day", "2 Days", "3 Days", "4 Days", "5+ Days"]);
        const nights = new Set(["0 Nights", "1 Night", "2 Nights", "3 Nights", "4 Nights", "5+ Nights"]);
        const specials = new Set(["Best Price Guarantee", "Free Cancellation"]);

        allTours.forEach(tour => {

            if (tour.language) {
                languages.add(tour.language);
            }

            if (tour.badge) {
                const badgeLower = tour.badge.toLowerCase();
                const isOffer =
                    badgeLower.includes('off') ||
                    badgeLower.includes('%') ||
                    badgeLower.includes('festival') ||
                    badgeLower.includes('discount') ||
                    badgeLower.includes('deal');

                if (isOffer) {
                    specials.add("Special Offers");
                } else {
                    specials.add(tour.badge);
                }
            }

            if (tour.duration) {

                const dayMatch = tour.duration.match(/(\d+)\s*Days?/i);
                if (dayMatch) {
                    const d = parseInt(dayMatch[1]);
                    if (d > 0 && d <= 5)
                        days.add(`${d} Day${d > 1 ? 's' : ''}`);
                    else if (d > 5)
                        days.add(`${d} Days`);
                }

                const nightMatch = tour.duration.match(/(\d+)\s*Nights?/i);
                if (nightMatch) {
                    const n = parseInt(nightMatch[1]);
                    if (n >= 0 && n <= 5)
                        nights.add(`${n} Night${n !== 1 ? 's' : ''}`);
                    else if (n > 5)
                        nights.add(`${n} Nights`);
                }
            }
        });

        return {
            languageOptions: Array.from(languages).sort(),
            daysOptions: Array.from(days).sort(),
            nightsOptions: Array.from(nights).sort(),
            specialsOptions: Array.from(specials).sort()
        };
    };

    const dynamicOptions = getDynamicOptions();

    /* ======================================================
       Return API
    ====================================================== */

    return {
        allTours,
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
    };
};