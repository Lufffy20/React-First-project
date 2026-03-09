import { useState, useEffect } from 'react';
import {
    getAdminToursApi, createAdminTourApi, updateAdminTourApi, deleteAdminTourApi,
    createItineraryApi, updateItineraryApi, deleteItineraryApi,
    createFaqApi, updateFaqApi, deleteFaqApi,
    createImageApi, deleteImageApi,
    createInclusionApi, deleteInclusionApi,
    createExclusionApi, deleteExclusionApi
} from '../helper/functionapi';
import { message } from 'antd';

export const useAdminTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [totalTours, setTotalTours] = useState(0);

    const fetchTours = async (options = {}) => {
        setLoading(true);
        try {
            const response = await getAdminToursApi(options.params || {});

            // Backend now returns { data, total, page, limit }
            const toursData = response.data?.data || response.data || [];
            if (response.data?.total !== undefined) {
                setTotalTours(response.data.total);
            }

            const normalizedTours = toursData.map(tour => ({
                id: tour.id,
                badge: tour.badge_text,
                image: tour.image ? `http://localhost:1337${tour.image}` : null,
                location: tour.location,
                title: tour.title,
                rating: tour.rating,
                reviews: tour.reviews_count,
                description: tour.description,
                bestPrice: tour.features?.best_price,
                freeCancel: tour.features?.free_cancel,
                duration: `${tour.days || 0} Days ${tour.nights || 0} Nights`,
                oldPrice: tour.old_price,
                price: tour.current_price,
                language: tour.tour_language,
                type: tour.tour_type
            }));
            setTours(normalizedTours);
            setError(null);
        } catch (err) {
            console.error('Fetch Tours Error:', err);
            setError(err);
            // Error is handled by Axios Interceptor with an AntD message,
            // but we keep the state for UI flexibility.
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTour = async (tourData) => {
        try {
            setLoading(true);
            const response = await createAdminTourApi(tourData);
            if (response.data) {
                message.success('Tour created successfully');
                await fetchTours(); // Refresh list automatically
                return true;
            }
        } catch (err) {
            console.error('Create tour error:', err);
            const data = err.response?.data;
            if (data?.problems && data.problems.length > 0) {
                message.error('Validation Error: ' + data.problems.join(', '));
            } else {
                message.error(data?.message || 'Failed to create tour');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTour = async (id, tourData) => {
        try {
            setLoading(true);
            const response = await updateAdminTourApi(id, tourData);
            if (response.data) {
                message.success('Tour updated successfully');
                await fetchTours();
                return true;
            }
        } catch (err) {
            console.error('Update tour error:', err);
            const data = err.response?.data;
            if (data?.problems && data.problems.length > 0) {
                message.error('Validation Error: ' + data.problems.join(', '));
            } else {
                message.error(data?.message || 'Failed to update tour');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTour = async (id) => {
        try {
            setLoading(true);
            await deleteAdminTourApi(id);
            message.success('Tour deleted successfully');
            await fetchTours();
            return true;
        } catch (err) {
            console.error('Delete tour error:', err);
            message.error('Failed to delete tour');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // --- Nested Resources Handlers ---

    // Itinerary Handlers
    const handleAddItinerary = async (tourId, data) => {
        try {
            setLoading(true);
            const response = await createItineraryApi(tourId, data);
            message.success('Itinerary day added');
            return response.data;
        } catch (err) {
            message.error('Failed to add itinerary');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateItinerary = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateItineraryApi(id, data);
            message.success('Itinerary updated');
            return response.data;
        } catch (err) {
            message.error('Failed to update itinerary');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItinerary = async (id) => {
        try {
            setLoading(true);
            await deleteItineraryApi(id);
            message.success('Itinerary day removed');
            return true;
        } catch (err) {
            message.error('Failed to delete itinerary');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // FAQ Handlers
    const handleAddFaq = async (tourId, data) => {
        try {
            setLoading(true);
            const response = await createFaqApi(tourId, data);
            message.success('FAQ added');
            return response.data;
        } catch (err) {
            message.error('Failed to add FAQ');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFaq = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateFaqApi(id, data);
            message.success('FAQ updated');
            return response.data;
        } catch (err) {
            message.error('Failed to update FAQ');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFaq = async (id) => {
        try {
            setLoading(true);
            await deleteFaqApi(id);
            message.success('FAQ removed');
            return true;
        } catch (err) {
            message.error('Failed to delete FAQ');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Image Handlers
    const handleAddImage = async (tourId, data) => {
        try {
            setLoading(true);
            const response = await createImageApi(tourId, data);
            message.success('Image added to gallery');
            return response.data;
        } catch (err) {
            message.error('Failed to add image');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            setLoading(true);
            await deleteImageApi(id);
            message.success('Image removed');
            return true;
        } catch (err) {
            message.error('Failed to delete image');
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Feature Items Handlers (Inclusions/Exclusions)
    const handleAddInclusion = async (tourId, data) => {
        try {
            setLoading(true);
            const response = await createInclusionApi(tourId, data);
            message.success('Inclusion added');
            return response.data;
        } catch (err) {
            message.error('Failed to add inclusion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteInclusion = async (id) => {
        try {
            setLoading(true);
            await deleteInclusionApi(id);
            message.success('Inclusion removed');
            return true;
        } catch (err) {
            message.error('Failed to delete inclusion');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleAddExclusion = async (tourId, data) => {
        try {
            setLoading(true);
            const response = await createExclusionApi(tourId, data);
            message.success('Exclusion added');
            return response.data;
        } catch (err) {
            message.error('Failed to add exclusion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteExclusion = async (id) => {
        try {
            setLoading(true);
            await deleteExclusionApi(id);
            message.success('Exclusion removed');
            return true;
        } catch (err) {
            message.error('Failed to delete exclusion');
            return false;
        } finally {
            setLoading(false);
        }
    };


    return {
        tours,
        totalTours,
        loading,
        error,
        fetchTours,
        refreshTours: fetchTours,
        handleCreateTour,
        handleUpdateTour,
        handleDeleteTour,
        // Nested Resource Handlers
        handleAddItinerary,
        handleUpdateItinerary,
        handleDeleteItinerary,
        handleAddFaq,
        handleUpdateFaq,
        handleDeleteFaq,
        handleAddImage,
        handleDeleteImage,
        handleAddInclusion,
        handleDeleteInclusion,
        handleAddExclusion,
        handleDeleteExclusion
    };
};
