/**
 * CustomerReviewsSection Component
 *
 * Purpose:
 * This component manages and displays the complete customer review system
 * for a tour. It provides functionality for:
 * - Fetching and displaying public reviews
 * - Showing average rating metrics
 * - Nested replies for reviews
 * - Submitting new reviews
 * - Submitting replies to existing reviews
 *
 * Features:
 * - Displays category-based rating summaries (Location, Amenities, Food, etc.)
 * - Dynamically loads reviews from backend API
 * - Allows users to post new reviews
 * - Supports threaded replies to reviews
 * - Pagination-style "See More / See Less" functionality
 * - Validates ratings before allowing review submission
 *
 * Notes:
 * - Uses Ant Design UI components (Form, Rate, Upload, Button)
 * - Uses dayjs for formatting dates
 * - API functions are handled through helper methods:
 *      getPublicReviewsApi
 *      submitPublicReviewApi
 *      submitReviewReplyApi
 */

import React, { useState, useEffect } from 'react';
import { Button, Input, Rate, Upload, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ReviewNode from './ReviewNode';
import { getPublicReviewsApi, submitPublicReviewApi, submitReviewReplyApi } from '../../helper/functionapi';

const CustomerReviewsSection = ({ tourId }) => {

    /**
     * Ant Design form instance
     */
    const [form] = Form.useForm();

    /**
     * Reviews list state
     */
    const [reviewsList, setReviewsList] = useState([]);

    /**
     * Average ratings state returned from backend
     */
    const [averages, setAverages] = useState({
        overall: 0,
        rating_location: 0,
        rating_amenities: 0,
        rating_food: 0,
        rating_room: 0,
        rating_price: 0,
        rating_tour_operator: 0
    });

    /**
     * Number of visible reviews
     */
    const [visibleCount, setVisibleCount] = useState(3);

    /**
     * Reply system states
     */
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');

    /**
     * Ratings selected by the user
     */
    const [ratings, setRatings] = useState({
        rating_location: 0,
        rating_amenities: 0,
        rating_food: 0,
        rating_room: 0,
        rating_price: 0,
        rating_tour_operator: 0
    });

    /**
     * Loading states
     */
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Normalize backend review structure into frontend format
     */
    const normalizeReview = (rev) => ({
        id: rev.id,
        initials: rev.reviewer_name?.substring(0, 2).toUpperCase() || 'U',
        name: rev.reviewer_name,
        date: dayjs(rev.createdAt).format("MMMM YYYY"),
        title: rev.title,
        desc: rev.comment,
        images: [],
        helpful: "Helpful",
        notHelpful: "Not helpful",
        replies: rev.replies ? rev.replies.map(normalizeReview) : []
    });

    /**
     * Fetch reviews from backend
     */
    const fetchReviews = async () => {
        if (!tourId) return;

        setIsLoading(true);

        try {
            const response = await getPublicReviewsApi(tourId);

            if (response.data && response.data.success) {

                const normalizedReviews =
                    response.data.data.map(normalizeReview);

                setReviewsList(normalizedReviews);

                if (response.data.averages) {
                    setAverages(response.data.averages);
                }
            }

        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Load reviews when tourId changes
     */
    useEffect(() => {
        fetchReviews();
    }, [tourId]);

    /**
     * Handle rating updates
     */
    const handleRatingChange = (key, value) => {
        setRatings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    /**
     * Handle review form submission
     */
    const handleFormSubmit = async (values) => {

        /**
         * Validate ratings
         */
        const missingRatings = [];

        if (ratings.rating_location === 0) missingRatings.push('Location');
        if (ratings.rating_amenities === 0) missingRatings.push('Amenities');
        if (ratings.rating_food === 0) missingRatings.push('Food');
        if (ratings.rating_room === 0) missingRatings.push('Room');
        if (ratings.rating_price === 0) missingRatings.push('Price');
        if (ratings.rating_tour_operator === 0) missingRatings.push('Tour Operator');

        if (missingRatings.length > 0) {
            message.warning(
                `Please provide a rating for: ${missingRatings.join(', ')}`
            );
            return;
        }

        setIsSubmitting(true);

        try {

            const submitData = {
                ...values,
                ...ratings
            };

            const response =
                await submitPublicReviewApi(tourId, submitData);

            if (response.data && response.data.success) {

                message.success("Review submitted successfully!");

                form.resetFields();

                setRatings({
                    rating_location: 0,
                    rating_amenities: 0,
                    rating_food: 0,
                    rating_room: 0,
                    rating_price: 0,
                    rating_tour_operator: 0
                });

                fetchReviews();

            } else {

                message.error(
                    response.data?.message ||
                    "Failed to submit review."
                );
            }

        } catch (error) {

            console.error("Error submitting review:", error);

            const errMsg =
                error.response?.data?.message ||
                "Failed to submit review.";

            message.error(errMsg);

        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Submit reply to existing review
     */
    const handleInlineReplySubmit = async (parentId) => {

        const token = localStorage.getItem('jwtToken');

        if (!token) {
            message.warning("Please login to reply to reviews.");
            return;
        }

        if (!replyText.trim()) {
            message.warning("Please enter your reply.");
            return;
        }

        setIsSubmitting(true);

        try {

            const response =
                await submitReviewReplyApi(parentId, {
                    comment: replyText
                });

            if (response.data && response.data.success) {

                message.success("Reply posted successfully!");

                setReplyingTo(null);
                setReplyText('');

                fetchReviews();

            } else {

                message.error(
                    response.data?.message ||
                    "Failed to post reply."
                );
            }

        } catch (error) {

            console.error("Error posting reply:", error);

            const errMsg =
                error.response?.data?.message ||
                "Failed to post reply.";

            message.error(errMsg);

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="tour-detail-customer-review-wrapper">

            {/* =========================
               Review Summary Section
            ========================= */}

            <div className="tour-detail-customer-review-section">

                <h2>Customer Reviews</h2>

                <div className="tour-detail-customer-review-container">

                    <div className="review-grid">

                        {/* Overall Rating */}
                        <div className="review-item overall-rating">
                            <div className="review-text">
                                <span className="review-label">
                                    Overall Rating
                                </span>

                                <span className="review-desc">
                                    {averages.overall >= 4.5
                                        ? 'Excellent'
                                        : averages.overall >= 3.5
                                            ? 'Good'
                                            : 'Average'}
                                </span>
                            </div>

                            <span className="review-score">
                                {averages.overall}
                            </span>
                        </div>

                        {/* Category Ratings */}

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Location</span>
                                <span className="review-desc">
                                    {averages.rating_location >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_location}
                            </span>
                        </div>

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Amenities</span>
                                <span className="review-desc">
                                    {averages.rating_amenities >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_amenities}
                            </span>
                        </div>

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Food</span>
                                <span className="review-desc">
                                    {averages.rating_food >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_food}
                            </span>
                        </div>

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Price</span>
                                <span className="review-desc">
                                    {averages.rating_price >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_price}
                            </span>
                        </div>

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">Rooms</span>
                                <span className="review-desc">
                                    {averages.rating_room >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_room}
                            </span>
                        </div>

                        <div className="review-item">
                            <div className="review-text">
                                <span className="review-label">
                                    Tour Operator
                                </span>
                                <span className="review-desc">
                                    {averages.rating_tour_operator >= 4 ? 'Excellent' : 'Good'}
                                </span>
                            </div>
                            <span className="review-score">
                                {averages.rating_tour_operator}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* =========================
               Reviews List Section
            ========================= */}

            <div className="tour-detail-reviews-list">

                {isLoading ? (
                    <p>Loading reviews...</p>

                ) : reviewsList.length === 0 ? (
                    <p>No reviews yet. Be the first to review!</p>

                ) : (
                    reviewsList
                        .slice(0, visibleCount)
                        .map((review) => (

                            <ReviewNode
                                key={review.id}
                                review={review}
                                depth={0}
                                replyingTo={replyingTo}
                                setReplyingTo={setReplyingTo}
                                replyText={replyText}
                                setReplyText={setReplyText}
                                handleInlineReplySubmit={handleInlineReplySubmit}
                            />
                        ))
                )}

            </div>

            {/* =========================
               See More / Less Button
            ========================= */}

            {reviewsList.length > 3 && (

                <Button
                    className="tour-detail-review-button"
                    type="primary"
                    onClick={() => {

                        if (visibleCount < reviewsList.length) {
                            setVisibleCount(prev => prev + 3);
                        } else {
                            setVisibleCount(3);
                        }

                    }}
                >
                    {visibleCount < reviewsList.length
                        ? 'See More Reviews'
                        : 'See Less Reviews'}
                </Button>

            )}

            {/* =========================
               Review Form Section
            ========================= */}

            <div className="tour-detail-review-reply">

                <h2>Leave a Reply</h2>

                <p className="tour-detail-review-reply-desc">
                    Your email address will not be published.
                    Required fields are marked *
                </p>

                {/* Rating Inputs */}

                <div className="tour-detail-review-ratings">

                    <div className="rating-item">
                        <span className="rating-label">Location</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_location}
                            onChange={(val) =>
                                handleRatingChange('rating_location', val)}
                        />
                    </div>

                    <div className="rating-item">
                        <span className="rating-label">Amenities</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_amenities}
                            onChange={(val) =>
                                handleRatingChange('rating_amenities', val)}
                        />
                    </div>

                    <div className="rating-item">
                        <span className="rating-label">Food</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_food}
                            onChange={(val) =>
                                handleRatingChange('rating_food', val)}
                        />
                    </div>

                    <div className="rating-item">
                        <span className="rating-label">Room</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_room}
                            onChange={(val) =>
                                handleRatingChange('rating_room', val)}
                        />
                    </div>

                    <div className="rating-item">
                        <span className="rating-label">Price</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_price}
                            onChange={(val) =>
                                handleRatingChange('rating_price', val)}
                        />
                    </div>

                    <div className="rating-item">
                        <span className="rating-label">Tour Operator</span>
                        <Rate
                            className="custom-rate"
                            value={ratings.rating_tour_operator}
                            onChange={(val) =>
                                handleRatingChange('rating_tour_operator', val)}
                        />
                    </div>

                </div>

                {/* Review Submission Form */}

                <Form
                    form={form}
                    className="tour-detail-reply-form"
                    onFinish={handleFormSubmit}
                >

                    <div className="reply-form-row">

                        <Form.Item
                            name="reviewer_name"
                            rules={[{ required: true, message: 'Please enter your name!' }]}
                            style={{ width: '100%', marginBottom: 0 }}
                        >
                            <Input
                                placeholder="Name *"
                                className="reply-input"
                                style={{ width: '100%', marginBottom: 0 }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="reviewer_email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            style={{ width: '100%', marginBottom: 0 }}
                        >
                            <Input
                                placeholder="Email *"
                                className="reply-input"
                                style={{ width: '100%', marginBottom: 0 }}
                            />
                        </Form.Item>

                    </div>

                    <Form.Item
                        name="title"
                        style={{ marginBottom: '16px', marginTop: '16px' }}
                    >
                        <Input
                            placeholder="Title"
                            className="reply-input-full"
                            style={{ marginBottom: 0 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="comment"
                        rules={[{ required: true, message: 'Please enter your comment!' }]}
                        style={{ marginBottom: '16px' }}
                    >
                        <Input.TextArea
                            placeholder="Comment *"
                            rows={4}
                            className="reply-textarea"
                            style={{ marginBottom: 0 }}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0 }}>

                        <Button
                            type="primary"
                            htmlType="submit"
                            className="reply-submit-btn"
                            loading={isSubmitting}
                        >
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </Button>

                    </Form.Item>

                </Form>

            </div>

        </div>
    );
};

export default CustomerReviewsSection;