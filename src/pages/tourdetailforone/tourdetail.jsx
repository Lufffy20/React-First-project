/**
 * TourDetail Page
 *
 * Purpose:
 * Displays complete details of a selected tour including images,
 * itinerary, inclusions, FAQs, reviews, booking options, and related tours.
 *
 * Features:
 * - Fetch tour details dynamically using tour ID
 * - Image gallery with primary image priority
 * - Tour overview, inclusions, exclusions, itinerary
 * - FAQ section
 * - Customer reviews with replies
 * - Booking sidebar for reservations
 * - Related tours suggestions
 *
 * Flow:
 * User clicks "View Details" on tour card
 *        ↓
 * Route → /tour-detail/:id
 *        ↓
 * getTourApi(id) fetches tour data
 *        ↓
 * Tour data passed into:
 *      • TourHeader
 *      • TourContent
 *      • TourFAQ
 *      • CustomerReviewsSection
 *      • BookingSidebar
 *      • RelatedTours
 */

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
    if (tour.images && tour.images.length > 0) {
        // Sort to put primary image first
        const sortedImages = [...tour.images].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0));
        sortedImages.forEach(img => {
            displayImages.push({ image: `http://localhost:1337${img.image_url}` });
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
                    <CustomerReviewsSection tourId={tour.id} />
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