/**
 * ProtectedRoute Component
 *
 * Purpose:
 * This component protects routes that require authentication.
 * It ensures that only logged-in users can access certain pages.
 * Additionally, it supports role-based protection for admin-only routes.
 *
 * Features:
 * - Redirects unauthenticated users to the login page
 * - Preserves the original destination so the user can be redirected back after login
 * - Supports admin-only route protection
 *
 * Props:
 * - children: The component(s) that should be rendered if access is allowed
 * - adminOnly: Boolean flag indicating if the route requires admin privileges
 *
 * Logic Flow:
 * 1. Check if the user is authenticated.
 *    - If not authenticated, redirect to the login page.
 * 2. If the route is marked as adminOnly:
 *    - Verify that the logged-in user has an admin role.
 *    - If not, redirect to the home page.
 * 3. If all conditions are satisfied, render the protected content.
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {

    /**
     * Access authentication state from Redux store
     * - isAuthenticated: indicates if user is logged in
     * - user: contains user information such as role
     */
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    /**
     * Location hook helps capture the route
     * the user originally attempted to access
     */
    const location = useLocation();

    /**
     * If user is not authenticated,
     * redirect to login page and store the intended destination
     */
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    /**
     * Role-based authorization check
     * Admin role is represented by value 1
     * If adminOnly flag is enabled and user is not admin,
     * redirect to homepage
     */
    if (adminOnly && user?.role !== 1) {
        return <Navigate to="/" replace />;
    }

    /**
     * If authentication and authorization checks pass,
     * render the protected component
     */
    return children;
};

export default ProtectedRoute;