/**
 * API Client Configuration
 *
 * Purpose:
 * Creates a centralized Axios instance used for all API
 * requests in the application. It automatically attaches
 * authentication tokens and handles global API errors.
 *
 * Features:
 * - Configured base API URL
 * - Automatically attaches JWT token to requests
 * - Handles authentication failures (401 errors)
 * - Clears invalid session data and redirects to login
 *
 * Notes:
 * - JWT token is stored in localStorage as "jwtToken"
 * - Authorization header format: Bearer <token>
 * - Response interceptor ensures expired sessions are handled globally
 */

import axios from 'axios';

/**
 * Create Axios instance
 *
 * baseURL:
 * Base endpoint for all API requests.
 *
 * withCredentials:
 * Enables sending cookies if needed. This is useful if the backend
 * uses sessions, but the current implementation primarily uses JWT.
 */
const apiClient = axios.create({
    baseURL: 'http://localhost:1337/api/v1',
    withCredentials: true
});

/**
 * Request Interceptor
 *
 * Automatically attaches the JWT token to every request
 * if it exists in localStorage.
 */
apiClient.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem('jwtToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }

);

/**
 * Response Interceptor
 *
 * Handles authentication errors globally.
 * If a request returns a 401 status (Unauthorized),
 * the stored session data is cleared and the user
 * is redirected to the login page.
 */
apiClient.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        if (error.response && error.response.status === 401) {

            console.error(
                "Authentication Error:",
                error.response.data.message
            );

            /**
             * Clear stored authentication data
             */
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');

            /**
             * Redirect user to login page
             */
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }

);

export default apiClient;