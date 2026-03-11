import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to login page, but save the current location they were trying to access
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role-based check: Admin role is 1
    if (adminOnly && user?.role !== 1) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
