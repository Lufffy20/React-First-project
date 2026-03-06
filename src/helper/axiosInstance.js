import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:1337/api/v1',
    withCredentials: true // Important for cookies/sessions if used, though we are using JWT headers here
});

// Interceptor to attach token
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

// Optional: Interceptor to handle expired tokens
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Authentication Error:", error.response.data.message);
            // Clear local storage and redirect to login
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
