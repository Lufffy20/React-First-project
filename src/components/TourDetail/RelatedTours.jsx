/**
 * RelatedTours Component
 *
 * Purpose:
 * Displays a carousel of tours related to the currently viewed tour.
 * It helps users discover additional tours they might be interested in.
 *
 * Features:
 * - Filters out the currently viewed tour from the list
 * - Converts raw tour data into the format expected by TourCard
 * - Displays tours inside a Swiper carousel
 * - Supports responsive breakpoints for different screen sizes
 * - Includes custom previous and next navigation buttons
 *
 * Notes:
 * - Uses Swiper.js for the slider functionality
 * - Uses TourCard component to render each individual tour
 * - If no related tours exist, the component returns null
 */

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import TourCard from "../../components/Tourcard/TourCard";

const RelatedTours = ({ tours, id }) => {

    /**
     * References for custom Swiper navigation buttons
     */
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    /**
     * Filter tours to exclude the current tour
     * and normalize the data structure for TourCard
     */
    const relatedTours = tours
        .filter(t => String(t.id) !== String(id))
        .map(t => ({
            id: t.id,
            name: t.title || t.location,
            description: t.description,
            rating: t.rating > 0
                ? `${t.rating} (${t.reviews_count || 0}+)`
                : "New",
            days: t.duration,
            from: `$${t.price}`,
            image: t.image
        }));

    /**
     * If no related tours are available,
     * do not render the section
     */
    if (relatedTours.length === 0) {
        return null;
    }

    return (
        <div className="tour-detail-related-section">

            {/* Section Title */}
            <h2>You might also like...</h2>

            {/* Swiper Container */}
            <div className="tour-detail-swiper-container">

                {/* Custom Navigation Buttons */}
                <div
                    className="tour-detail-swiper-button-prev"
                    ref={prevRef}
                >
                    ❮
                </div>

                <div
                    className="tour-detail-swiper-button-next"
                    ref={nextRef}
                >
                    ❯
                </div>

                {/* Swiper Slider */}
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}

                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}

                    /**
                     * Assign navigation elements before Swiper initialization
                     */
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}

                    modules={[Navigation]}

                    /**
                     * Responsive breakpoints
                     */
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >

                    {/* Render Related Tours */}
                    {relatedTours.map((item) => (
                        <SwiperSlide key={item.id}>
                            <TourCard item={item} />
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>
    );
};

export default RelatedTours;