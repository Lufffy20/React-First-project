import React from "react";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../redux/favorites/favoritesSlice";
import { message } from "antd";

const AllToursCard = ({ tour }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Check if favorited (handling both tour object or favorite record structure)
    const isFavorite = favorites.some((fav) => fav.id === tour.id || fav.tour_id === tour.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            message.warning("Please login to add to favorites");
            return;
        }
        dispatch(toggleFavorite({ tourId: tour.id, isFavorite }));
    };

    return (
        <div className="tour-list-card">
            <div className="card-image-wrapper">
                {tour.badge && (
                    <div className="card-badge" style={tour.badgeColor ? { backgroundColor: tour.badgeColor } : {}}>
                        {tour.badge}
                    </div>
                )}
                <div
                    className={`card-heart-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? (
                        <HeartFilled style={{ color: '#ff4d4f' }} />
                    ) : (
                        <HeartOutlined />
                    )}
                </div>
                <img src={tour.image} alt="Tour thumbnail" />
            </div>

            <div className="card-info-middle">
                <p className="card-location">{tour.location}</p>
                <h3 className="card-title">{tour.title}</h3>

                <div className="card-rating-row">
                    <span className="rating-star">★ {tour.rating > 0 ? tour.rating : "New"}</span>
                    <span className="rating-reviews">({tour.reviews_count || 0})</span>
                </div>

                <p className="card-description">{tour.description}</p>

                <div className="card-guarantees">
                    {tour.bestPrice && <span className="guarantee-item best-price">Best Price Guarantee</span>}
                    {tour.freeCancel && <span className="guarantee-item free-cancel">Free Cancellation</span>}
                </div>
            </div>

            <div className="card-pricing-right">
                <p className="card-duration">{tour.duration}</p>

                <div className="card-price-info">
                    <p className="old-price">${tour.oldPrice}</p>
                    <p className="current-price">From <strong>${tour.price}</strong></p>
                </div>

                <button className="view-details-btn" onClick={() => navigate(`/tour-detail/${tour.id}`)}>View Details</button>
            </div>
        </div>
    );
};

export default AllToursCard;
