import React from "react";
import { Select } from 'antd';

const AllToursListHeader = ({ totalTours, indexOfFirstTour, indexOfLastTour, sortBy, onSortChange }) => {
    return (
        <div className="results-toolbar">
            <span className="results-count">
                Showing {totalTours === 0 ? 0 : indexOfFirstTour + 1}-{Math.min(indexOfLastTour, totalTours)} of {totalTours} tours
            </span>
            <div className="results-sort-container">
                <span className="results-sort-label">Sort by:</span>
                <Select
                    value={sortBy}
                    onChange={onSortChange}
                    className="results-sort-select"
                    bordered={false}
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
