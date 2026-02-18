import React from "react";
import "./customerreviews.css";
import sectionImage from "../../assets/img/customerreviews.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const customerreviews = [
    {
        id: 1,
        name: "Paris",
        review: "Excellent experience",
        description:
            "I had an amazing experience with this company. The service was top-notch, and the staff was incredibly friendly. I highly recommend them!",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
    },
    {
        id: 2,
        name: "Singapore",
        review: "Very Good",
        description:
            "Everything was perfectly organized. The tour guides were knowledgeable and made the entire journey memorable.",
        image:
            "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
    },
    {
        id: 3,
        name: "Roma",
        review: "Great Service",
        description:
            "A smooth and comfortable experience from start to finish. Highly professional team and excellent support.",
        image:
            "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800",
    },
];

const CustomerReviews = () => {
    return (
        <div
            className="customerreviews-section"
            style={{ backgroundImage: `url(${sectionImage})` }}
        >
            <div className="customerreviews-header">
                <h1>Customer Reviews</h1>
            </div>

            <div className="customerreviews-container">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >
                    {customerreviews.map((customerreview) => (
                        <SwiperSlide key={customerreview.id}>
                            <div className="customerreviews-item">

                                {/* Profile Image */}
                                <div className="customerreviews-item-image">
                                    <img
                                        src={customerreview.image}
                                        alt={customerreview.name}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Review Title */}
                                <p className="customerreviews-item-review">
                                    {customerreview.review}
                                </p>

                                {/* Description */}
                                <p className="customerreviews-item-description">
                                    {customerreview.description}
                                </p>

                                {/* Name */}
                                <h5>{customerreview.name}</h5>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default CustomerReviews;
