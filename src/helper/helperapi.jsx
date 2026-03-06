import apiClient from './axiosInstance';

export const signupAxiosCall = (userData) => {
    return apiClient.post('/user/signup', userData);
};

export const loginAxiosCall = (credentials) => {
    return apiClient.post('/user/login', credentials);
};

export const forgotPasswordAxiosCall = (data) => {
    return apiClient.post('/user/forgot-password', data);
};

export const resetPasswordAxiosCall = (data) => {
    return apiClient.post('/user/reset-password', data);
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

// Assuming admin wants its own find-one too, but routes.js shows standard find-one is still used.
// Let's add admin update and delete.

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
    return apiClient.get('/users');
};

export const createUserAxiosCall = (data) => {
    return apiClient.post('/users', data);
};

export const updateUserAxiosCall = (id, data) => {
    return apiClient.patch(`/users/${id}`, data);
};

export const deleteUserAxiosCall = (id) => {
    return apiClient.delete(`/users/${id}`);
};
