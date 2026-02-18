import "./artical.css";
const articals = [
    {
        id: 1,
        date: "2026-02-18",
        by: "100+ Tours",
        description: "Kenya vs Tanzania Safari: The Better African Safari Experience",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        date: "Singapore",
        by: "300+ Tours",
        description: "Exploring the Serengeti: A Wildlife Adventure",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        date: "Roma",
        by: "400+ Tours",
        description: "Into the Wild: An Unforgettable Safari Journey",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                    <div className="artical-card">
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
