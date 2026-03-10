import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import TourCard from "../../components/Tourcard/TourCard";

const RelatedTours = ({ tours, id }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const relatedTours = tours
        .filter(t => String(t.id) !== String(id))
        .map(t => ({
            id: t.id,
            name: t.title || t.location,
            description: t.description,
            rating: t.rating > 0 ? `${t.rating} (${t.reviews_count || 0}+)` : "New",
            days: t.duration,
            from: `$${t.price}`,
            image: t.image
        }));

    if (relatedTours.length === 0) {
        return null;
    }

    return (
        <div className="tour-detail-related-section">
            <h2>You might also like...</h2>
            <div className="tour-detail-swiper-container">
                <div className="tour-detail-swiper-button-prev" ref={prevRef}>❮</div>
                <div className="tour-detail-swiper-button-next" ref={nextRef}>❯</div>
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
