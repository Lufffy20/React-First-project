import { useState } from 'react';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupApi, loginApi, forgotPasswordApi, resetPasswordApi } from '../helper/functionapi';
import { login, logout } from '../redux/auth/authSlice';
import apiClient from '../helper/axiosInstance';

// --- LOGIN HOOK ---
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await loginApi({
                email: values.email,
                password: values.password
            });

            if (response.status === 200) {
                message.success('Login Successful! Welcome back.');
                // Store JWT token if provided
                if (response.data.token) {
                    localStorage.setItem('jwtToken', response.data.token);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
                dispatch(login(response.data.user));

                // Role-based redirection
                if (response.data.user.role === 1) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error('Login Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleLogin };
};

// --- SIGNUP HOOK ---
export const useSignup = () => {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (values) => {
        setLoading(true);
        try {
            const response = await signupApi({
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
                termsAndConditions: values.termsAndConditions,
            });

            if (response.status === 200 || response.status === 201) {
                message.success(response.data.message || 'Account created successfully!');
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSignup };
};

// --- FORGOT PASSWORD HOOK ---
export const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();
    const [submitted, setSubmitted] = useState(false);

    const handleForgotPassword = async (values) => {
        setLoading(true);
        try {
            const response = await forgotPasswordApi({ email: values.email });
            message.success(response.data.message || 'Reset link sent!');
            setSubmitted(true);
        } catch (error) {
            console.error('Forgot Password Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, submitted, setSubmitted, handleForgotPassword };
};

// --- RESET PASSWORD HOOK ---
export const useResetPassword = (token) => {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (values) => {
        if (!token) {
            message.error("Missing token!");
            return;
        }

        setLoading(true);
        try {
            const response = await resetPasswordApi({
                password: values.password,
                token: token
            });

            message.success(response.data.message || 'Password reset successful!');
            navigate('/login');
        } catch (error) {
            console.error('Reset Password Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleResetPassword };
};

// --- LOGOUT HOOK ---
export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();

    const handleLogout = () => {
        // Clear Redux state
        dispatch(logout());

        // Clear localStorage
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user'); // If stored separately

        // Clear axios header
        delete apiClient.defaults.headers.common['Authorization'];

        message.success('Logged out successfully.');
        navigate('/login');
    };

    return { handleLogout };
};
