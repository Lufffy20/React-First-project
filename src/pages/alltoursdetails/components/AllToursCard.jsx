import React from "react";
import { useNavigate } from "react-router-dom";

const AllToursCard = ({ tour }) => {
    const navigate = useNavigate();
    return (
        <div className="tour-list-card">
            <div className="card-image-wrapper">
                {tour.badge && (
                    <div className="card-badge" style={tour.badgeColor ? { backgroundColor: tour.badgeColor } : {}}>
                        {tour.badge}
                    </div>
                )}
                <button className="card-heart-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                <img src={tour.image} alt="Tour thumbnail" />
            </div>

            <div className="card-info-middle">
                <p className="card-location">{tour.location}</p>
                <h3 className="card-title">{tour.title}</h3>

                <div className="card-rating-row">
                    <span className="rating-star">★ {tour.rating}</span>
                    <span className="rating-reviews">({tour.reviews})</span>
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
