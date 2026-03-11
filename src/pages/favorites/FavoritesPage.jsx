import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../redux/favorites/favoritesSlice";
import TourCard from "../../components/Tourcard/TourCard";
import Header from "../../components/home/Header";
import { Empty, Spin } from "antd";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const { items: favorites, loading } = useSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    // Map backend tour model to what TourCard expects
    const mappedFavorites = favorites.map((tour) => {
        let imageUrl = tour.image;
        if (tour.images && tour.images.length > 0) {
            const primaryImage = tour.images.find(img => img.is_primary);
            imageUrl = primaryImage ? primaryImage.image_url : tour.images[0].image_url;
        }

        // If it's a relative path, prefix with backend URL
        if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `http://localhost:1337${imageUrl}`;
        }

        return {
            id: tour.id,
            name: tour.title,
            location: tour.location,
            description: tour.description,
            rating: tour.rating > 0 ? `${tour.rating} (${tour.reviews_count || 0}+)` : "New",
            days: `${tour.days} Days`,
            from: `$${tour.current_price}`,
            image: imageUrl
        };
    });

    return (
        <div className="favorites-page">
            <Header />
            <div className="find-popular-tours-section" style={{ minHeight: '80vh' }}>
                <div className="find-popular-tours-header">
                    <h2>My Favorite Tours</h2>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : mappedFavorites.length > 0 ? (
                    <div className="find-popular-tours-grid">
                        {mappedFavorites.map((item) => (
                            <TourCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <Empty
                        description="You haven't added any favorites yet!"
                        style={{ marginTop: '50px' }}
                    />
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
