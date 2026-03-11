/**
 * TourCard Component
 *
 * Purpose:
 * Displays a single tour card used in listings such as
 * "Popular Tours", "Featured Tours", or search results.
 *
 * Features:
 * - Shows tour image, name, description, rating, and duration
 * - Allows users to add/remove tours from favorites
 * - Favorite state is managed via Redux
 * - Prevents unauthenticated users from adding favorites
 *
 * Behavior:
 * - If the user clicks the favorite icon:
 *      1. If not logged in → show warning message
 *      2. If logged in → toggle favorite state
 *
 * Notes:
 * - Favorite detection supports both `id` and `tour_id`
 *   because some APIs may return different identifiers.
 * - `stopPropagation()` prevents parent click events
 *   when the favorite icon is clicked.
 */

import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { message } from "antd";

const TourCard = ({ item }) => {

    /**
     * Redux dispatcher
     */
    const dispatch = useDispatch();

    /**
     * Get favorites list from Redux store
     */
    const { items: favorites } = useSelector((state) => state.favorites);

    /**
     * Get authentication status
     */
    const { isAuthenticated } = useSelector((state) => state.auth);

    /**
     * Determine if this tour is already in favorites
     * Supports both id and tour_id formats
     */
    const isFavorite = favorites.some(
        (fav) =>
            String(fav.id) === String(item.id) ||
            String(fav.tour_id) === String(item.id)
    );

    /**
     * Favorite button click handler
     * - Stops event bubbling
     * - Checks authentication
     * - Toggles favorite state
     */
    const handleFavoriteClick = (e) => {

        e.stopPropagation();

        if (!isAuthenticated) {
            message.warning("Please login to add to favorites");
            return;
        }

        dispatch(
            toggleFavorite({
                tourId: item.id,
                isFavorite
            })
        );
    };

    return (
        <div className="find-popular-tours-card">

            {/* ===============================
               Tour Image Section
            =============================== */}
            <div className="find-popular-tours-image-container">

                {/* Tour image */}
                <img
                    src={item.image}
                    alt={item.name}
                />

                {/* Favorite icon overlay */}
                <div
                    className={`favorite-icon ${isFavorite ? "active" : ""
                        }`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite
                        ? <HeartFilled />
                        : <HeartOutlined />
                    }
                </div>

            </div>

            {/* ===============================
               Tour Content Section
            =============================== */}
            <div className="find-popular-tours-content">

                {/* Tour title */}
                <h5>{item.name}</h5>

                {/* Tour description */}
                <p className="tour-desc">
                    {item.description}
                </p>

                {/* Tour rating */}
                <p className="tour-rating">
                    ⭐ {item.rating}
                </p>

                <hr />

                {/* Duration and starting price */}
                <div className="tour-days-from">
                    <p>{item.days}</p>
                    <p>{item.from}</p>
                </div>

            </div>

        </div>
    );
};

export default TourCard;