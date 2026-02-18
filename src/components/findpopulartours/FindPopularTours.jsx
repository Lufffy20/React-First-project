import React, { useState } from "react";
import "./FindPopularTours.css";
import TourCard from "./TourCard";

const Tours = [
    {
        id: 1,
        name: "Paris",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "Singapore",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Roma",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        name: "Bangkok",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        name: "Bali",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        name: "Phuket",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        name: "Tokyo",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        name: "Cappadocia",
        description: "Discover the magic of Paris with our curated selection of tours. From iconic landmarks to hidden gems, we have something for every traveler.",
        rating: "4.5(100+)",
        days: "3 Days",
        from: "$100",
        image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const FindPopularTours = () => {
    return (
        <div className="find-popular-tours-section">
            <div className="find-popular-tours-header">
                <h2>Find Popular Tours</h2>
                <a href="#" className="view-all">View All</a>
            </div>

            <div className="find-popular-tours-grid">
                {Tours.map((item) => (
                    <TourCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default FindPopularTours;
