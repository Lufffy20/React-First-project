import React from "react";
import "./tourdetail.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";

// Import the newly extracted components
import TourHeader from "../../components/TourDetail/TourHeader";
import TourContent from "../../components/TourDetail/TourContent";
import TourFAQ from "../../components/TourDetail/TourFAQ";
import BookingSidebar from "../../components/TourDetail/BookingSidebar";
import CustomerReviewsSection from "../../components/TourDetail/CustomerReviewsSection";
import RelatedTours from "../../components/TourDetail/RelatedTours";

const tourDetailImage = [
    { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
    { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
    { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
    { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" }
];

const TourDetail = () => {
    const { id } = useParams();
    const tours = useSelector(state => state.tours.tours || []);
    const tour = tours.find(t => String(t.id) === String(id));

    if (!tour) {
        return (
            <>
                <Header />
                <div style={{ textAlign: "center", padding: "100px 0" }}>
                    <h2>Tour Not Found</h2>
                </div>
                <Footer />
            </>
        );
    }

    const displayImages = [
        { image: tour.image || tourDetailImage[0].image },
        { image: tourDetailImage[1].image },
        { image: tourDetailImage[2].image },
        { image: tourDetailImage[3].image }
    ];

    return (
        <>
            <Header />

            <TourHeader tour={tour} displayImages={displayImages} />

            <div className="tour-main-wrapper">
                <div className="tour-detail-container">
                    <TourContent tour={tour} />
                    <TourFAQ />
                    <hr />
                    <CustomerReviewsSection />
                </div>

                {/* Right Column Booking Sidebar */}
                <BookingSidebar tour={tour} />
            </div>

            <RelatedTours tours={tours} id={id} />

            <Footer />
        </>
    );
};

export default TourDetail;