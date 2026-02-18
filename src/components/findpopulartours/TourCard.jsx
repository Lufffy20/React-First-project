import React from "react";
import "./FindPopularTours.css";

const TourCard = ({ item }) => {
    return (
        <div className="find-popular-tours-card">
            <div className="find-popular-tours-image-container">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="find-popular-tours-content">
                <h5>{item.name}</h5>

                <p className="tour-desc">{item.description}</p>

                <p className="tour-rating">⭐ {item.rating}</p> <hr />
                <div className="tour-days-from">
                    <p>{item.days}</p>
                    <p>{item.from}</p>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
