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

