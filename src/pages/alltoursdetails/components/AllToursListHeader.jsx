/**
 * AllToursListHeader Component
 *
 * Purpose:
 * Displays the **top toolbar of the tours list page** showing:
 * - Current result range
 * - Total number of tours
 * - Sorting options dropdown
 *
 * Features:
 * - Displays "Showing X-Y of Z tours"
 * - Allows users to sort tours
 * - Uses Ant Design Select component
 * - Controlled component (sort state handled by parent)
 *
 * Props:
 * totalTours        → Total number of tours returned from backend
 * indexOfFirstTour  → Index of first tour in current page
 * indexOfLastTour   → Index of last tour in current page
 * sortBy            → Current sorting value
 * onSortChange      → Callback to update sorting
 */

import React from "react";
import { Select } from 'antd';

const AllToursListHeader = ({
    totalTours,
    indexOfFirstTour,
    indexOfLastTour,
    sortBy,
    onSortChange
}) => {

    return (

        <div className="results-toolbar">

            {/* Result Count */}
            <span className="results-count">
                Showing {totalTours === 0 ? 0 : indexOfFirstTour + 1}-
                {Math.min(indexOfLastTour, totalTours)} of {totalTours} tours
            </span>



            {/* Sorting */}
            <div className="results-sort-container">

                <span className="results-sort-label">
                    Sort by:
                </span>

                <Select
                    value={sortBy}
                    onChange={onSortChange}
                    className="results-sort-select"
                    variant="borderless"
                    suffixIcon={null}
                    options={[
                        { value: 'featured', label: 'Featured' },
                        { value: 'priceLowHigh', label: 'Price: Low to High' },
                        { value: 'priceHighLow', label: 'Price: High to Low' },
                        { value: 'rating', label: 'Top Rated' },
                        { value: 'reviews', label: 'Most Reviewed' },
                    ]}
                />

            </div>

        </div>

    );

};

export default AllToursListHeader;