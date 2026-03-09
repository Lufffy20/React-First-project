import apiClient from './axiosInstance';

export const signupAxiosCall = (userData) => {
    return apiClient.post('/auth/signup', userData);
};

export const loginAxiosCall = (credentials) => {
    return apiClient.post('/auth/login', credentials);
};

export const forgotPasswordAxiosCall = (data) => {
    return apiClient.post('/auth/forgot-password', data);
};

export const resetPasswordAxiosCall = (data) => {
    return apiClient.post('/auth/reset-password', data);
};

export const fetchToursAxiosCall = (params = {}) => {
    return apiClient.get('/tours', { params });
};

export const fetchAdminToursAxiosCall = (params = {}) => {
    return apiClient.get('/admin/tours', { params });
};

export const createTourAxiosCall = (data) => {
    return apiClient.post('/tours', data);
};

export const createAdminTourAxiosCall = (data) => {
    return apiClient.post('/admin/tours', data);
};

export const fetchTourAxiosCall = (id) => {
    return apiClient.get(`/tours/${id}`);
};

export const updateTourAxiosCall = (id, data) => {
    return apiClient.patch(`/tours/${id}`, data);
};

export const updateAdminTourAxiosCall = (id, data) => {
    return apiClient.patch(`/admin/tours/${id}`, data);
};

export const deleteTourAxiosCall = (id) => {
    return apiClient.delete(`/tours/${id}`);
};

export const deleteAdminTourAxiosCall = (id) => {
    return apiClient.delete(`/admin/tours/${id}`);
};

export const fetchUsersAxiosCall = () => {
    return apiClient.get('/admin/users');
};

export const createUserAxiosCall = (data) => {
    return apiClient.post('/admin/users', data);
};

export const updateUserAxiosCall = (id, data) => {
    return apiClient.patch(`/admin/users/${id}`, data);
};

export const deleteUserAxiosCall = (id) => {
    return apiClient.delete(`/admin/users/${id}`);
};

// Itinerary APIs
export const createItineraryAxiosCall = (tourId, data) => {
    return apiClient.post(`/admin/tours/${tourId}/itinerary`, data);
};

export const updateItineraryAxiosCall = (id, data) => {
    return apiClient.patch(`/admin/itinerary/${id}`, data);
};

export const deleteItineraryAxiosCall = (id) => {
    return apiClient.delete(`/admin/itinerary/${id}`);
};

// FAQ APIs
export const createFaqAxiosCall = (tourId, data) => {
    return apiClient.post(`/admin/tours/${tourId}/faq`, data);
};

export const updateFaqAxiosCall = (id, data) => {
    return apiClient.patch(`/admin/faq/${id}`, data);
};

export const deleteFaqAxiosCall = (id) => {
    return apiClient.delete(`/admin/faq/${id}`);
};

// Image Gallery APIs
export const createImageAxiosCall = (tourId, data) => {
    return apiClient.post(`/admin/tours/${tourId}/image`, data);
};

export const deleteImageAxiosCall = (id) => {
    return apiClient.delete(`/admin/image/${id}`);
};

// Inclusions/Exclusions APIs
export const createInclusionAxiosCall = (tourId, data) => {
    return apiClient.post(`/admin/tours/${tourId}/inclusion`, data);
};

export const deleteInclusionAxiosCall = (id) => {
    return apiClient.delete(`/admin/inclusion/${id}`);
};

export const createExclusionAxiosCall = (tourId, data) => {
    return apiClient.post(`/admin/tours/${tourId}/exclusion`, data);
};

export const deleteExclusionAxiosCall = (id) => {
    return apiClient.delete(`/admin/exclusion/${id}`);
};
