/**
 * TourHeader Component
 *
 * Purpose:
 * Displays the top section of the tour details page including
 * the tour title, rating, location, feature tags, image gallery,
 * share functionality, and wishlist (favorites) option.
 *
 * Features:
 * - Displays breadcrumb navigation
 * - Shows tour title and metadata (rating, reviews, location)
 * - Displays feature badges (Featured, Best Price, Free Cancellation)
 * - Allows users to add/remove the tour from favorites
 * - Allows sharing the tour using the Web Share API
 * - Displays tour images in a responsive grid
 * - Opens a modal image gallery with Swiper slider
 *
 * Notes:
 * - Favorites are managed via Redux (favoritesSlice)
 * - Sharing uses the browser Web Share API if supported,
 *   otherwise falls back to copying the URL to clipboard
 * - The modal displays all images in a Swiper carousel
 */

import React, { useState } from 'react';
import { Button, Modal, Row, Col, message } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/favorites/favoritesSlice';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TourHeader = ({ tour, displayImages }) => {

    /**
     * Modal state for image gallery
     */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Redux hooks
     */
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);
    const { isAuthenticated } = useSelector((state) => state.auth);

    /**
     * Check if current tour is already in favorites
     */
    const isFavorite = favorites.some(
        (fav) =>
            String(fav.id) === String(tour.id) ||
            String(fav.tour_id) === String(tour.id)
    );

    /**
     * Handle add/remove favorite
     */
    const handleFavoriteClick = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            message.warning("Please login to add to favorites");
            return;
        }

        dispatch(toggleFavorite({
            tourId: tour.id,
            isFavorite
        }));
    };

    /**
     * Handle share functionality
     */
    const handleShareClick = async (e) => {
        e.preventDefault();

        const shareData = {
            title: tour.title,
            text: `Check out this tour: ${tour.title}`,
            url: window.location.href,
        };

        try {

            // Use Web Share API if supported
            if (navigator.share) {
                await navigator.share(shareData);
            }

            // Fallback: copy link to clipboard
            else {
                await navigator.clipboard.writeText(window.location.href);
                message.success("Link copied to clipboard!");
            }

        } catch (err) {

            console.error("Error sharing:", err);

            // Ignore if user cancelled sharing
            if (err.name !== 'AbortError') {
                message.error("Failed to share link");
            }

        }
    };

    return (
        <>

            {/* ========================================
               Header Section
               Breadcrumb + Tour Title
            ======================================== */}

            <div className="tour-detail-header">

                <p className="tour-detail-header-breadcrumb">
                    home &gt; tours &gt; {tour.location}
                </p>

                <p className="tour-detail-header-title">
                    {tour.title}
                </p>

            </div>

            {/* ========================================
               Main Tour Content Section
            ======================================== */}

            <div className="tour-detail-content-section">

                <div className="tour-detail-top-wrapper">

                    {/* Feature Badges + Title Section */}
                    <div className="tour-detail-header1-section">

                        <div className="tour-detail-header1">

                            {tour.features?.is_featured && (
                                <Button type="primary">
                                    Featured
                                </Button>
                            )}

                            {tour.features?.best_price && (
                                <Button type="primary">
                                    Best Price
                                </Button>
                            )}

                            {tour.features?.free_cancel && (
                                <Button type="primary">
                                    Free cancellation
                                </Button>
                            )}

                        </div>

                        <div className="tour-detail-header1-title">

                            <p>{tour.title}</p>

                            <div className="tour-detail-info">

                                <p>
                                    <span className="rating-star">
                                        ★ {(tour.rating && tour.rating > 0)
                                            ? tour.rating
                                            : "New"}
                                    </span>

                                    <span className="rating-reviews">
                                        ({tour.reviews_count || 0})
                                    </span>
                                </p>

                                <p>{tour.location}</p>

                                <p>{tour.reviews_count || 0} reviews</p>

                            </div>

                        </div>

                    </div>

                    {/* Share + Wishlist */}
                    <div className="tour-detail-tag">

                        <a
                            href=""
                            onClick={handleShareClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                        >
                            <ShareAltOutlined />
                            Share
                        </a>

                        <a
                            href=""
                            onClick={handleFavoriteClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                color: isFavorite ? '#ff4d4f' : 'inherit'
                            }}
                        >

                            {isFavorite
                                ? <HeartFilled />
                                : <HeartOutlined />
                            }

                            wishlist

                        </a>

                    </div>

                </div>

                {/* ========================================
                   Tour Image Grid
                ======================================== */}

                <div className="tour-detail-image-section">

                    <Row gutter={[10, 10]}>

                        {/* Main Image */}
                        {displayImages?.[0] && (
                            <Col xs={24} md={16}>
                                <div
                                    className="tour-detail-image"
                                    style={{ aspectRatio: '800 / 510' }}
                                >
                                    <img
                                        src={displayImages[0].image}
                                        alt="tour-detail-image"
                                    />
                                </div>
                            </Col>
                        )}

                        {/* Right Side Images */}
                        <Col xs={24} md={8}>

                            <Row gutter={[10, 10]}>

                                {displayImages?.[1] && (
                                    <Col span={24}>
                                        <div
                                            className="tour-detail-image"
                                            style={{ aspectRatio: '400 / 250' }}
                                        >
                                            <img
                                                src={displayImages[1].image}
                                                alt="tour-detail-image"
                                            />
                                        </div>
                                    </Col>
                                )}

                                {displayImages?.[2] && (
                                    <Col span={12}>
                                        <div
                                            className="tour-detail-image"
                                            style={{ aspectRatio: '200 / 250' }}
                                        >
                                            <img
                                                src={displayImages[2].image}
                                                alt="tour-detail-image"
                                            />
                                        </div>
                                    </Col>
                                )}

                                {displayImages?.[3] && (
                                    <Col span={12}>
                                        <div
                                            className="tour-detail-image"
                                            style={{ aspectRatio: '200 / 250' }}
                                        >

                                            <img
                                                src={displayImages[3].image}
                                                alt="tour-detail-image"
                                            />

                                            <div
                                                className="see-all-photos-btn"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                See all photos
                                            </div>

                                        </div>
                                    </Col>
                                )}

                            </Row>

                        </Col>

                    </Row>

                </div>

            </div>

            {/* ========================================
               Image Gallery Modal
            ======================================== */}

            <Modal
                title="All Photos"
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >

                <div style={{ padding: '20px 0' }}>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                    >

                        {displayImages?.map((imgObj, index) => (

                            <SwiperSlide key={index}>

                                <img
                                    src={imgObj.image}
                                    alt={`tour-image-${index}`}
                                    style={{
                                        width: '100%',
                                        maxHeight: '70vh',
                                        objectFit: 'contain',
                                        borderRadius: '8px'
                                    }}
                                />

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </Modal>

        </>
    );
};

export default TourHeader;