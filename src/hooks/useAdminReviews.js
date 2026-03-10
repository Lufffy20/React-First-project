import { useState } from 'react';
import {
    getAdminToursApi,
    createReviewApi, getReviewApi, updateReviewApi, deleteReviewApi
} from '../helper/functionapi';
import { message } from 'antd';

export const useAdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all tours (with reviews populated) and flatten reviews
    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await getAdminToursApi({ limit: 100 });
            const toursData = response.data?.data || response.data || [];
            setTours(toursData);

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
