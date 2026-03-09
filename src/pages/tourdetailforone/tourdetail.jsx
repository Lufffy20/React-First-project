import React, { useState, useEffect } from "react";
import "./tourdetail.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin, Button, message } from 'antd';
import Header from "../../components/home/Header";
import Footer from "../../components/home/Footer";
import { getTourApi } from "../../helper/functionapi";

// Import the newly extracted components
import TourHeader from "../../components/TourDetail/TourHeader";
import TourContent from "../../components/TourDetail/TourContent";
import TourFAQ from "../../components/TourDetail/TourFAQ";
import BookingSidebar from "../../components/TourDetail/BookingSidebar";
import CustomerReviewsSection from "../../components/TourDetail/CustomerReviewsSection";
import RelatedTours from "../../components/TourDetail/RelatedTours";

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const tours = useSelector(state => state.tours.tours || []); // For RelatedTours

    useEffect(() => {
        const fetchTourDetails = async () => {
            try {
                setIsLoading(true);
                const response = await getTourApi(id);
                if (response.data && response.data.success) {
                    setTour(response.data.data);
                } else {
                    message.error("Failed to load tour details");
                }
            } catch (error) {
                console.error("Error fetching tour details:", error);
                message.error("Error loading tour details");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchTourDetails();
        }
    }, [id]);

    if (isLoading) {
        return (
            <>
                <Header />
                <div style={{ textAlign: "center", padding: "100px 0" }}>
                    <Spin size="large" tip="Loading tour details..." />
                </div>
                <Footer />
            </>
        );
    }

    if (!tour) {
        return (
            <>
                <Header />
                <div style={{ textAlign: "center", padding: "100px 0" }}>
                    <h2>Tour Not Found</h2>
                    <Button onClick={() => navigate('/')}>Back to Home</Button>
                </div>
                <Footer />
            </>
        );
    }

    // Build image gallery
    const displayImages = [];
    if (tour.image) displayImages.push({ image: tour.image });
    if (tour.gallery && tour.gallery.length > 0) {
        tour.gallery.forEach(img => {
            displayImages.push({ image: img.image_url });
        });
    }

    // Add placeholders if not enough images for the layout
    const placeholders = [
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop"
    ];

    while (displayImages.length < 4) {
        displayImages.push({ image: placeholders[displayImages.length % placeholders.length] });
    }

    return (
        <>
            <Header />

            <TourHeader tour={tour} displayImages={displayImages} />

            <div className="tour-main-wrapper">
                <div className="tour-detail-container">
                    <TourContent tour={tour} />
                    {tour.faqs && tour.faqs.length > 0 && <TourFAQ faqs={tour.faqs} />}
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