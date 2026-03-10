import { useState, useEffect } from 'react';
import {
    getAdminToursApi, createAdminTourApi, updateAdminTourApi, deleteAdminTourApi,
    createItineraryApi, updateItineraryApi, deleteItineraryApi,
    createFaqApi, updateFaqApi, deleteFaqApi, getFaqApi,
    createInclusionApi, getInclusionApi, updateInclusionApi, deleteInclusionApi,
    createExclusionApi, getExclusionApi, updateExclusionApi, deleteExclusionApi,
    setPrimaryImageApi
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

            const normalizedTours = toursData.map(tour => {
                // Deriving main thumbnail: search for primary, or fallback to first
                const gallery = tour.images || tour.gallery || [];
                const primaryRecord = gallery.find(img => img.is_primary) || gallery[0];
                const mainImage = primaryRecord ? primaryRecord.image_url : null;

                return {
                    id: tour.id,
                    badge: tour.badge_text,
                    image: mainImage ? `http://localhost:1337${mainImage}` : null,
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
                    type: tour.tour_type,
                    group_size: tour.group_size,
                    ages: tour.ages,
                    inclusions: tour.inclusions || [],
                    exclusions: tour.exclusions || [],
                    faqs: tour.faqs || [],
                    itineraries: tour.itineraries || [],
                    gallery: gallery
                };
            });
            setTours(normalizedTours);
            setError(null);
        } catch (err) {
            console.error('Fetch Tours Error:', err);
            setError(err);
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
                await fetchTours();
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

    const handleGetItinerary = async (id) => {
        try {
            setLoading(true);
            const response = await getItineraryApi(id);
            return response.data;
        } catch (err) {
            message.error('Failed to fetch itinerary');
            return null;
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

    const handleGetFaq = async (id) => {
        try {
            setLoading(true);
            const response = await getFaqApi(id);
            return response.data;
        } catch (err) {
            message.error('Failed to fetch FAQ details');
            return null;
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

    const handleGetInclusion = async (id) => {
        try {
            setLoading(true);
            const response = await getInclusionApi(id);
            return response.data;
        } catch (err) {
            message.error('Failed to fetch inclusion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInclusion = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateInclusionApi(id, data);
            message.success('Inclusion updated');
            return response.data;
        } catch (err) {
            message.error('Failed to update inclusion');
            return null;
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

    const handleGetExclusion = async (id) => {
        try {
            setLoading(true);
            const response = await getExclusionApi(id);
            return response.data;
        } catch (err) {
            message.error('Failed to fetch exclusion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateExclusion = async (id, data) => {
        try {
            setLoading(true);
            const response = await updateExclusionApi(id, data);
            message.success('Exclusion updated');
            return response.data;
        } catch (err) {
            message.error('Failed to update exclusion');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Gallery Image Handlers
    const handleAddImage = async (tourId, formData) => {
        try {
            setLoading(true);
            const response = await createImageApi(tourId, formData);
            message.success('Image added to gallery');
            return response.data;
        } catch (err) {
            console.error('Add image error:', err);
            message.error('Failed to upload image');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            setLoading(true);
            await deleteImageApi(id);
            message.success('Image removed from gallery');
            return true;
        } catch (err) {
            console.error('Delete image error:', err);
            message.error('Failed to remove image');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleSetPrimaryImage = async (id) => {
        try {
            setLoading(true);
            await setPrimaryImageApi(id);
            message.success('Main photo updated');
            return true;
        } catch (err) {
            console.error('Set primary image error:', err);
            message.error('Failed to update main photo');
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
        handleGetItinerary,
        handleAddFaq,
        handleUpdateFaq,
        handleDeleteFaq,
        handleGetFaq,
        handleAddInclusion,
        handleGetInclusion,
        handleUpdateInclusion,
        handleDeleteInclusion,
        handleAddExclusion,
        handleGetExclusion,
        handleUpdateExclusion,
        handleDeleteExclusion,
        // Gallery Image Handlers
        handleAddImage,
        handleDeleteImage,
        handleSetPrimaryImage
    };
};
