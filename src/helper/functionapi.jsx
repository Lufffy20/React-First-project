import { signupAxiosCall, loginAxiosCall, forgotPasswordAxiosCall, resetPasswordAxiosCall, fetchToursAxiosCall, fetchAdminToursAxiosCall, createTourAxiosCall, createAdminTourAxiosCall, fetchTourAxiosCall, updateTourAxiosCall, updateAdminTourAxiosCall, deleteTourAxiosCall, deleteAdminTourAxiosCall, fetchUsersAxiosCall, createUserAxiosCall, updateUserAxiosCall, deleteUserAxiosCall } from './helperapi';

// Yahan se aap UI Component (LoginPage, SignupPage) mei functions import karenge

export const signupApi = async (userData) => {
    // Improvement: Client-Side Safety Check
    if (!userData.email || !userData.password || !userData.firstName) {
        throw new Error("Missing required fields. Please fill all inputs properly.");
    }

    // Ye function aage 'helperapi.jsx' ke axios function ko call karega
    return await signupAxiosCall(userData);
};

export const loginApi = async (credentials) => {
    // Improvement: Client-Side Safety Check
    if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required to login.");
    }

    // Ye function aage 'helperapi.jsx' ke axios function ko call karega
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
