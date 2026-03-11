/**
 * API Service Layer
 *
 * Purpose:
 * This file acts as a **service layer between UI components and Axios API calls**.
 * UI components (LoginPage, SignupPage, Admin panels, etc.) import functions from here
 * instead of directly calling Axios.
 *
 * Advantages:
 * - Centralized API structure
 * - Easier maintenance and debugging
 * - Allows client-side validation before API requests
 * - Clean separation between UI logic and API logic
 *
 * Architecture:
 * UI Components
 *        ↓
 *   API Service Layer (this file)
 *        ↓
 * Axios Helper Layer (helperapi.js)
 *        ↓
 * Backend API
 */

import {
    signupAxiosCall,
    loginAxiosCall,
    forgotPasswordAxiosCall,
    resetPasswordAxiosCall,

    fetchToursAxiosCall,
    fetchAdminToursAxiosCall,
    createTourAxiosCall,
    createAdminTourAxiosCall,
    fetchTourAxiosCall,
    updateTourAxiosCall,
    updateAdminTourAxiosCall,
    deleteTourAxiosCall,
    deleteAdminTourAxiosCall,

    fetchUsersAxiosCall,
    createUserAxiosCall,
    updateUserAxiosCall,
    deleteUserAxiosCall,

    createItineraryAxiosCall,
    updateItineraryAxiosCall,
    deleteItineraryAxiosCall,
    fetchItineraryAxiosCall,

    createFaqAxiosCall,
    updateFaqAxiosCall,
    deleteFaqAxiosCall,
    fetchFaqAxiosCall,

    createImageAxiosCall,
    deleteImageAxiosCall,
    patchPrimaryImageAxiosCall,

    createInclusionAxiosCall,
    fetchInclusionAxiosCall,
    updateInclusionAxiosCall,
    deleteInclusionAxiosCall,

    createExclusionAxiosCall,
    fetchExclusionAxiosCall,
    updateExclusionAxiosCall,
    deleteExclusionAxiosCall,

    createReviewAxiosCall,
    fetchReviewAxiosCall,
    updateReviewAxiosCall,
    deleteReviewAxiosCall,

    fetchPublicReviewsAxiosCall,
    submitPublicReviewAxiosCall,
    submitReviewReplyAxiosCall,

    fetchBookedDatesAxiosCall
} from './helperapi';



/**
 * ============================
 * Authentication APIs
 * ============================
 */

export const signupApi = async (userData) => {

    // Client-side validation
    if (!userData.email || !userData.password || !userData.firstName) {
        throw new Error("Missing required fields. Please fill all inputs properly.");
    }

    return await signupAxiosCall(userData);
};


export const loginApi = async (credentials) => {

    if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required to login.");
    }

    return await loginAxiosCall(credentials);
};


export const forgotPasswordApi = async (data) => {

    if (!data.email) {
        throw new Error("Email is required to reset password.");
    }

    return await forgotPasswordAxiosCall(data);
};


export const resetPasswordApi = async (data) => {

    if (!data.password || !data.token) {
        throw new Error("Password and reset token are required.");
    }

    return await resetPasswordAxiosCall(data);
};



/**
 * ============================
 * Tour APIs
 * ============================
 */

export const getToursApi = async (params = {}) => {
    return await fetchToursAxiosCall(params);
};

export const getAdminToursApi = async (params = {}) => {
    return await fetchAdminToursAxiosCall(params);
};

export const createTourApi = async (tourData) => {
    return await createTourAxiosCall(tourData);
};

export const createAdminTourApi = async (tourData) => {
    return await createAdminTourAxiosCall(tourData);
};

export const getTourApi = async (id) => {
    return await fetchTourAxiosCall(id);
};

export const updateTourApi = async (id, tourData) => {
    return await updateTourAxiosCall(id, tourData);
};

export const updateAdminTourApi = async (id, tourData) => {
    return await updateAdminTourAxiosCall(id, tourData);
};

export const deleteTourApi = async (id) => {
    return await deleteTourAxiosCall(id);
};

export const deleteAdminTourApi = async (id) => {
    return await deleteAdminTourAxiosCall(id);
};



/**
 * ============================
 * User Management APIs
 * ============================
 */

export const getUsersApi = async () => {
    return await fetchUsersAxiosCall();
};

export const createUserApi = async (userData) => {
    return await createUserAxiosCall(userData);
};

export const updateUserApi = async (id, userData) => {
    return await updateUserAxiosCall(id, userData);
};

export const deleteUserApi = async (id) => {
    return await deleteUserAxiosCall(id);
};



/**
 * ============================
 * Tour Itinerary APIs
 * ============================
 */

export const createItineraryApi = async (tourId, data) => {
    return await createItineraryAxiosCall(tourId, data);
};

export const updateItineraryApi = async (id, data) => {
    return await updateItineraryAxiosCall(id, data);
};

export const getItineraryApi = async (id) => {
    return await fetchItineraryAxiosCall(id);
};

export const deleteItineraryApi = async (id) => {
    return await deleteItineraryAxiosCall(id);
};



/**
 * ============================
 * FAQ APIs
 * ============================
 */

export const createFaqApi = async (tourId, data) => {
    return await createFaqAxiosCall(tourId, data);
};

export const updateFaqApi = async (id, data) => {
    return await updateFaqAxiosCall(id, data);
};

export const deleteFaqApi = async (id) => {
    return await deleteFaqAxiosCall(id);
};

export const getFaqApi = async (id) => {
    return await fetchFaqAxiosCall(id);
};



/**
 * ============================
 * Image Management APIs
 * ============================
 */

export const createImageApi = async (tourId, data) => {
    return await createImageAxiosCall(tourId, data);
};

export const deleteImageApi = async (id) => {
    return await deleteImageAxiosCall(id);
};

export const setPrimaryImageApi = async (id) => {
    return await patchPrimaryImageAxiosCall(id);
};



/**
 * ============================
 * Tour Inclusions APIs
 * ============================
 */

export const createInclusionApi = async (tourId, data) => {
    return await createInclusionAxiosCall(tourId, data);
};

export const getInclusionApi = async (id) => {
    return await fetchInclusionAxiosCall(id);
};

export const updateInclusionApi = async (id, data) => {
    return await updateInclusionAxiosCall(id, data);
};

export const deleteInclusionApi = async (id) => {
    return await deleteInclusionAxiosCall(id);
};



/**
 * ============================
 * Tour Exclusions APIs
 * ============================
 */

export const createExclusionApi = async (tourId, data) => {
    return await createExclusionAxiosCall(tourId, data);
};

export const getExclusionApi = async (id) => {
    return await fetchExclusionAxiosCall(id);
};

export const updateExclusionApi = async (id, data) => {
    return await updateExclusionAxiosCall(id, data);
};

export const deleteExclusionApi = async (id) => {
    return await deleteExclusionAxiosCall(id);
};



/**
 * ============================
 * Admin Review APIs
 * ============================
 */

export const createReviewApi = async (tourId, data) => {
    return await createReviewAxiosCall(tourId, data);
};

export const getReviewApi = async (id) => {
    return await fetchReviewAxiosCall(id);
};

export const updateReviewApi = async (id, data) => {
    return await updateReviewAxiosCall(id, data);
};

export const deleteReviewApi = async (id) => {
    return await deleteReviewAxiosCall(id);
};



/**
 * ============================
 * Public Review APIs
 * ============================
 */

export const getPublicReviewsApi = async (tourId) => {
    return await fetchPublicReviewsAxiosCall(tourId);
};

export const submitPublicReviewApi = async (tourId, data) => {
    return await submitPublicReviewAxiosCall(tourId, data);
};

export const submitReviewReplyApi = async (reviewId, data) => {
    return await submitReviewReplyAxiosCall(reviewId, data);
};



/**
 * ============================
 * Booking Calendar APIs
 * ============================
 */

export const getBookedDatesApi = async (tourId) => {
    return await fetchBookedDatesAxiosCall(tourId);
};