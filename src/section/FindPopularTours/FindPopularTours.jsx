import React from "react";
import { useSelector } from "react-redux";
import "./FindPopularTours.css";
import TourCard from "../../components/Tourcard/TourCard";
import { Link } from "react-router-dom";
import { Spin } from "antd";

const FindPopularTours = () => {
    // Get tours from Redux store (populated by useTours in dashboard)
    const { tours } = useSelector((state) => state.tours);

    // Sort by reviews to get "popular" ones, take top 8
    const popularTours = [...tours]
        .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        .slice(0, 8);

    // Map Redux tour model to what TourCard expects
    const mappedTours = popularTours.map((tour) => ({
        id: tour.id,
        name: tour.title,
        location: tour.location,
        description: tour.description,
        rating: tour.rating > 0 ? `${tour.rating} (${tour.reviews || 0}+)` : "New",
        days: tour.duration,
        from: `$${tour.price}`,
        image: tour.image
    }));

    if (tours.length === 0) {
        return null;
    }

    return (
        <div className="find-popular-tours-section">
            <div className="find-popular-tours-header">
                <h2>Find Popular Tours</h2>
                <Link to="/all-tours-details" className="view-all">View All</Link>
            </div>

            <div className="find-popular-tours-grid">
                {mappedTours.map((item) => (
                    <TourCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default FindPopularTours;
