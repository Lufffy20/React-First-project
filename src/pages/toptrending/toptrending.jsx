import React, { useRef } from "react";
import "./toptrending.css";
import TourCard from "../../components/findpopulartours/TourCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Tours = [
    {
        id: 1,
        name: "Paris",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073",
    },
    {
        id: 2,
        name: "Singapore",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052",
    },
    {
        id: 3,
        name: "Roma",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996",
    },
    {
        id: 4,
        name: "Bangkok",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000",
    },
    {
        id: 5,
        name: "Bali",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038",
    },
    {
        id: 6,
        name: "Phuket",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001",
    },
    {
        id: 7,
        name: "Tokyo",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974",
    },
    {
        id: 8,
        name: "Cappadocia",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070",
    },
];

const TopTrending = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="top-trending-section">
            <div className="custom-swiper-button-prev" ref={prevRef}>❮</div>
            <div className="custom-swiper-button-next" ref={nextRef}>❯</div>
            <div className="top-trending-container">
                <div className="top-trending-header">
                    <h2>Top Trending </h2>
                    <a href="#" className="view-all">View All</a>
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
                    {Tours.map((item) => (
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
