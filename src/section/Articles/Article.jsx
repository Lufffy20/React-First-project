/**
 * Artical Section (Travel Articles)
 *
 * Purpose:
 * Displays a list of travel-related articles on the homepage.
 *
 * Features:
 * - Static article data (can later be replaced with API data)
 * - Each article card shows:
 *      • Image
 *      • Date / location info
 *      • Tour count
 *      • Article description
 * - "See all" link for future full blog/article page
 *
 * Flow:
 * Homepage loads
 *        ↓
 * Artical component renders
 *        ↓
 * Articles array is mapped into cards
 *        ↓
 * Cards displayed in grid layout
 */

import "./Article.css";

const articals = [
    {
        id: 1,
        date: "2026-02-18",
        by: "100+ Tours",
        description: "Kenya vs Tanzania Safari: The Better African Safari Experience",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
        id: 2,
        date: "Singapore",
        by: "300+ Tours",
        description: "Exploring the Serengeti: A Wildlife Adventure",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
        id: 3,
        date: "Roma",
        by: "400+ Tours",
        description: "Into the Wild: An Unforgettable Safari Journey",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
];

const Artical = () => {
    return (
        <div className="artical-section">
            <div className="artical-header">
                <h2>Travel Articles</h2>
                <a href="#" className="see-all">See all</a>
            </div>

            <div className="artical-container">
                {articals.map((artical) => (
                    <div className="artical-card" key={artical.id}>
                        <div className="artical-image-container">
                            <p className="artical-type">Trip</p>
                            <img src={artical.image} alt="article" />
                        </div>

                        <p className="artical-date">
                            {artical.date} | {artical.by}
                        </p>

                        <p className="artical-description">
                            {artical.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artical;