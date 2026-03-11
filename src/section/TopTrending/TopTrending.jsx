/**
 * TopTrending Section
 *
 * Purpose:
 * Displays a carousel of trending tours on the homepage.
 *
 * Features:
 * - Fetches tours from Redux store
 * - Displays tours in a Swiper carousel
 * - Custom previous/next navigation buttons
 * - Responsive breakpoints for mobile/tablet/desktop
 * - Uses reusable TourCard component
 * - Provides navigation to "View All Tours"
 *
 * Logic:
 * - Currently selects first 8 tours as trending
 * - Can later be replaced with API-based trending logic
 *
 * Flow:
 * Dashboard loads
 *        ↓
 * useTours fetches tours
 *        ↓
 * Redux store updated
 *        ↓
 * TopTrending reads tours
 *        ↓
 * Selects first 8 tours
 *        ↓
 * Maps data to TourCard format
 *        ↓
 * Displays in Swiper slider
 */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./TopTrending.css";
import TourCard from "../../components/Tourcard/TourCard";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TopTrending = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const { tours } = useSelector((state) => state.tours);

    // Using latest tours or "featured" as trending - for now just taking first 8
    const trendingTours = tours.slice(0, 8);

    const mappedTours = trendingTours.map((tour) => ({
        id: tour.id,
        name: tour.title,
        location: tour.location,
        description: tour.description,
        rating: tour.rating > 0 ? `${tour.rating} (${tour.reviews || 0}+)` : "New",
        days: tour.duration,
        from: `$${tour.price}`,
        image: tour.image
    }));

    if (tours.length === 0) return null;

    return (
        <div className="top-trending-section">
            <div className="custom-swiper-button-prev" ref={prevRef}>❮</div>
            <div className="custom-swiper-button-next" ref={nextRef}>❯</div>

            <div className="top-trending-container">
                <div className="top-trending-header">
                    <h2>Top Trending </h2>
                    <Link to="/all-tours-details" className="view-all">View All</Link>
                </div>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {mappedTours.map((item) => (
                        <SwiperSlide key={item.id}>
                            <TourCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopTrending;