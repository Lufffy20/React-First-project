/**
 * useTours Hook
 *
 * Purpose:
 * Custom React hook used to manage **tour data operations**
 * such as fetching, creating, updating, and deleting tours.
 *
 * Features:
 * - Fetch tours from API
 * - Normalize backend data for UI usage
 * - Store tours in Redux store
 * - Manage loading and error states
 * - Provide CRUD operations for tours
 * - Display success/error messages using Ant Design
 *
 * Architecture:
 * Component
 *    ↓
 * useTours Hook
 *    ↓
 * API Service Layer (functionapi.js)
 *    ↓
 * Axios Helper
 *    ↓
 * Backend API
 */

import { useState, useEffect } from 'react';
import {
    getToursApi,
    createTourApi,
    updateTourApi,
    deleteTourApi
} from '../helper/functionapi';

import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setTours as setReduxTours } from '../redux/tours/toursSlice';



export const useTours = () => {

    /**
     * ===============================
     * Redux State
     * ===============================
     */

    const dispatch = useDispatch();
    const tours = useSelector((state) => state.tours.tours);



    /**
     * ===============================
     * Local State
     * ===============================
     */

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalTours, setTotalTours] = useState(0);



    /**
     * ===============================
     * Fetch Tours
     * ===============================
     *
     * Retrieves tours from backend and normalizes
     * the data before storing it in Redux.
     */

    const fetchTours = async (options = {}) => {

        setLoading(true);

        try {

            const response = await getToursApi(
                options.params || {}
            );

            const toursData =
                response.data?.data ||
                response.data ||
                [];

            /**
             * Store total tours for pagination
             */
            if (response.data?.total !== undefined) {
                setTotalTours(response.data.total);
            }

            /**
             * Normalize backend data
             * for consistent UI usage
             */
            const normalizedTours = toursData.map(tour => {

                const gallery = tour.images || [];

                const primaryImage =
                    gallery.find(img => img.is_primary)
                    || gallery[0];

                const imagePath =
                    primaryImage
                        ? primaryImage.image_url
                        : null;

                return {

                    id: tour.id,

                    badge: tour.badge_text,

                    image:
                        imagePath
                            ? `http://localhost:1337${imagePath}`
                            : null,

                    location: tour.location,

                    title: tour.title,

                    rating: tour.rating || 0,

                    reviews: tour.reviews_count || 0,

                    reviews_count:
                        tour.reviews_count || 0,

                    description: tour.description,

                    bestPrice:
                        tour.features?.best_price,

                    freeCancel:
                        tour.features?.free_cancel,

                    duration:
                        `${tour.days || 0} Days ${tour.nights || 0} Nights`,

                    oldPrice: tour.old_price,

                    price: tour.current_price,

                    language: tour.tour_language,

                    type: tour.tour_type,

                    group_size: tour.group_size,

                    ages: tour.ages

                };

            });

            /**
             * Store tours in Redux
             */
            dispatch(setReduxTours(normalizedTours));

            setError(null);

        } catch (err) {

            console.error('Fetch Tours Error:', err);

            setError(err);

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Create Tour
     * ===============================
     */

    const handleCreateTour = async (tourData) => {

        try {

            setLoading(true);

            const response =
                await createTourApi(tourData);

            if (response.data) {

                message.success(
                    'Tour created successfully'
                );

                /**
                 * Refresh tour list
                 */
                await fetchTours();

                return true;

            }

        } catch (err) {

            console.error('Create tour error:', err);

            const data = err.response?.data;

            if (data?.problems && data.problems.length > 0) {

                message.error(
                    'Validation Error: ' +
                    data.problems.join(', ')
                );

            } else {

                message.error(
                    data?.message ||
                    'Failed to create tour'
                );

            }

            return false;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Update Tour
     * ===============================
     */

    const handleUpdateTour = async (id, tourData) => {

        try {

            setLoading(true);

            const response =
                await updateTourApi(id, tourData);

            if (response.data) {

                message.success(
                    'Tour updated successfully'
                );

                await fetchTours();

                return true;

            }

        } catch (err) {

            console.error('Update tour error:', err);

            const data = err.response?.data;

            if (data?.problems && data.problems.length > 0) {

                message.error(
                    'Validation Error: ' +
                    data.problems.join(', ')
                );

            } else {

                message.error(
                    data?.message ||
                    'Failed to update tour'
                );

            }

            return false;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Delete Tour
     * ===============================
     */

    const handleDeleteTour = async (id) => {

        try {

            setLoading(true);

            await deleteTourApi(id);

            message.success(
                'Tour deleted successfully'
            );

            await fetchTours();

            return true;

        } catch (err) {

            console.error('Delete tour error:', err);

            message.error(
                'Failed to delete tour'
            );

            return false;

        } finally {

            setLoading(false);

        }

    };



    /**
     * ===============================
     * Auto Load Tours
     * ===============================
     */

    useEffect(() => {

        fetchTours();

    }, []);



    /**
     * ===============================
     * Hook Return API
     * ===============================
     */

    return {

        tours,
        totalTours,
        loading,
        error,

        fetchTours,

        refreshTours: fetchTours,

        handleCreateTour,
        handleUpdateTour,
        handleDeleteTour

    };

};