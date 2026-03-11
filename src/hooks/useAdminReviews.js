/**
 * useAdminReviews Hook
 *
 * Purpose:
 * Custom React hook used for managing **Admin Review operations**.
 * It provides functions to fetch, create, update, and delete reviews
 * while also managing loading state and review data.
 *
 * Features:
 * - Fetch all tours and flatten reviews from them
 * - Add new review for a tour
 * - Get single review details
 * - Update existing review
 * - Delete review
 * - Manage loading state
 * - Show success/error messages using Ant Design
 *
 * Notes:
 * - Reviews are stored inside tours in backend,
 *   so we first fetch tours and then extract reviews.
 * - Reviews are flattened and enriched with tour info
 *   like `tourId` and `tourTitle`.
 */

import { useState } from 'react';
import {
    getAdminToursApi,
    createReviewApi,
    getReviewApi,
    updateReviewApi,
    deleteReviewApi
} from '../helper/functionapi';
import { message } from 'antd';

export const useAdminReviews = () => {

    /**
     * ===============================
     * State Management
     * ===============================
     */

    const [reviews, setReviews] = useState([]);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);



    /**
     * ===============================
     * Fetch Reviews
     * ===============================
     * Fetch all tours and flatten the reviews
     * into a single reviews array.
     */

    const fetchReviews = async () => {

        setLoading(true);

        try {

            const response = await getAdminToursApi({ limit: 100 });

            const toursData =
                response.data?.data ||
                response.data ||
                [];

            setTours(toursData);

            /**
             * Extract reviews from tours
             * and attach tour metadata
             */
            const allReviews = toursData.flatMap(tour =>
                (tour.reviews || []).map(review => ({
                    ...review,
                    tourId: tour.id,
                    tourTitle: tour.title
                }))
            );

            setReviews(allReviews);

        } catch (err) {

            console.error('Fetch reviews error:', err);
            message.error('Failed to load reviews');

        } finally {

            setLoading(false);

        }
    };



    /**
     * ===============================
     * Add Review
     * ===============================
     */

    const handleAddReview = async (tourId, data) => {

        try {

            setLoading(true);

            const response = await createReviewApi(tourId, data);

            message.success('Review added');

            return response.data;

        } catch (err) {

            message.error('Failed to add review');

            return null;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Get Single Review
     * ===============================
     */

    const handleGetReview = async (id) => {

        try {

            setLoading(true);

            const response = await getReviewApi(id);

            return response.data;

        } catch (err) {

            message.error('Failed to fetch review');

            return null;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Update Review
     * ===============================
     */

    const handleUpdateReview = async (id, data) => {

        try {

            setLoading(true);

            const response = await updateReviewApi(id, data);

            message.success('Review updated');

            return response.data;

        } catch (err) {

            message.error('Failed to update review');

            return null;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Delete Review
     * ===============================
     */

    const handleDeleteReview = async (id) => {

        try {

            setLoading(true);

            await deleteReviewApi(id);

            message.success('Review deleted');

            return true;

        } catch (err) {

            message.error('Failed to delete review');

            return false;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Return Hook API
     * ===============================
     */

    return {

        reviews,
        tours,
        loading,

        fetchReviews,
        handleAddReview,
        handleGetReview,
        handleUpdateReview,
        handleDeleteReview

    };

};