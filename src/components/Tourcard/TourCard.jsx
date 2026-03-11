import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { message } from "antd";

const TourCard = ({ item }) => {
    const dispatch = useDispatch();
    const { items: favorites } = useSelector((state) => state.favorites);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const isFavorite = favorites.some((fav) => String(fav.id) === String(item.id) || String(fav.tour_id) === String(item.id));

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            message.warning("Please login to add to favorites");
            return;
        }
        dispatch(toggleFavorite({ tourId: item.id, isFavorite }));
    };

    return (
        <div className="find-popular-tours-card">
            <div className="find-popular-tours-image-container">
                <img src={item.image} alt={item.name} />
                <div
                    className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                </div>
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
