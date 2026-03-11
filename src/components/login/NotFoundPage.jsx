/**
 * NotFoundPage Component
 *
 * Purpose:
 * Displays a user-friendly message when a user navigates
 * to a route that does not exist in the application.
 *
 * Features:
 * - Shows a clear 404 error message
 * - Provides a simple explanation to the user
 * - Includes a navigation link to return to the homepage
 *
 * Notes:
 * - This component is typically used as the fallback route
 *   in React Router when no other route matches.
 */

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {

    return (

        /**
         * Main container for the 404 page
         * Centered content with spacing from the top
         */
        <div
            style={{
                textAlign: "center",
                marginTop: "100px"
            }}
        >

            {/* Page title */}
            <h1>404 - Page Not Found</h1>

            {/* Explanation text */}
            <p>
                The page you are looking for does not exist.
            </p>

            {/* Link to redirect the user back to the homepage */}
            <Link to="/">
                Go Back Home
            </Link>

        </div>
    );
};

export default NotFoundPage;