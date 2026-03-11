/**
 * Authentication Hooks
 *
 * Purpose:
 * This file contains **custom React hooks for authentication workflows**
 * including Login, Signup, Forgot Password, Reset Password, and Logout.
 *
 * These hooks:
 * - Handle API communication
 * - Manage loading state
 * - Show UI notifications
 * - Update Redux authentication state
 * - Perform navigation after successful actions
 *
 * Architecture:
 * UI Component
 *      ↓
 * Auth Hook (this file)
 *      ↓
 * API Service Layer
 *      ↓
 * Axios Helper
 *      ↓
 * Backend API
 */

import { useState } from 'react';
import { App } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
    signupApi,
    loginApi,
    forgotPasswordApi,
    resetPasswordApi
} from '../helper/functionapi';

import { login, logout } from '../redux/auth/authSlice';
import apiClient from '../helper/axiosInstance';



/**
 * =====================================================
 * LOGIN HOOK
 * =====================================================
 *
 * Handles:
 * - Login request
 * - Token storage
 * - Redux authentication update
 * - Role-based redirection
 */

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

                /**
                 * Store JWT token
                 */
                if (response.data.token) {

                    localStorage.setItem('jwtToken', response.data.token);

                    apiClient.defaults.headers.common['Authorization'] =
                        `Bearer ${response.data.token}`;

                }

                /**
                 * Store user in Redux
                 */
                dispatch(login(response.data.user));

                /**
                 * Role-based redirect
                 */
                if (response.data.user.role === 1) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }

            }

        } catch (error) {

            console.error('Login Error:', error);

            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                'Login failed. Please try again.';

            message.error(errorMessage);

        } finally {

            setLoading(false);

        }

    };

    return { loading, handleLogin };

};



/**
 * =====================================================
 * SIGNUP HOOK
 * =====================================================
 *
 * Handles:
 * - Account creation
 * - Validation feedback
 * - Redirect to login after successful signup
 */

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

                message.success(
                    response.data.message ||
                    'Account created successfully!'
                );

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



/**
 * =====================================================
 * FORGOT PASSWORD HOOK
 * =====================================================
 *
 * Handles:
 * - Request password reset link
 * - Display success notification
 * - Toggle submission state
 */

export const useForgotPassword = () => {

    const [loading, setLoading] = useState(false);
    const { message } = App.useApp();

    const [submitted, setSubmitted] = useState(false);

    const handleForgotPassword = async (values) => {

        setLoading(true);

        try {

            const response =
                await forgotPasswordApi({ email: values.email });

            message.success(
                response.data.message ||
                'Reset link sent!'
            );

            setSubmitted(true);

        } catch (error) {

            console.error('Forgot Password Error:', error);

        } finally {

            setLoading(false);

        }

    };

    return {
        loading,
        submitted,
        setSubmitted,
        handleForgotPassword
    };

};



/**
 * =====================================================
 * RESET PASSWORD HOOK
 * =====================================================
 *
 * Handles:
 * - Reset password using token
 * - Validation and error handling
 * - Redirect to login after success
 */

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

            message.success(
                response.data.message ||
                'Password reset successful!'
            );

            navigate('/login');

        } catch (error) {

            console.error('Reset Password Error:', error);

        } finally {

            setLoading(false);

        }

    };

    return { loading, handleResetPassword };

};



/**
 * =====================================================
 * LOGOUT HOOK
 * =====================================================
 *
 * Handles:
 * - Clearing Redux auth state
 * - Removing stored JWT
 * - Removing Axios Authorization header
 * - Redirecting to login page
 */

export const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message } = App.useApp();

    const handleLogout = () => {

        /**
         * Clear Redux authentication state
         */
        dispatch(logout());

        /**
         * Remove stored credentials
         */
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');

        /**
         * Remove axios auth header
         */
        delete apiClient.defaults.headers.common['Authorization'];

        message.success('Logged out successfully.');

        navigate('/login');

    };

    return { handleLogout };

};