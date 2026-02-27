import { createSlice } from "@reduxjs/toolkit";

const initialToursData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
        badge: "20% OFF",
        location: "Paris, France",
        title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        rating: 4.8,
        reviews: 269,
        description: "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
        bestPrice: true,
        freeCancel: true,
        duration: "2 Days 1 Nights",
        oldPrice: 1200,
        price: 114,
        type: "Adventure Tours"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop",
        badge: null,
        location: "Paris, France",
        title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        rating: 4.8,
        reviews: 269,
        description: "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
        bestPrice: true,
        freeCancel: true,
        duration: "2 Days 1 Nights",
        oldPrice: 1200,
        price: 114,
        type: "Nature Tours"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop",
        badge: "FEATURED",
        badgeColor: "#5735c0",
        location: "Paris, France",
        title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        rating: 4.8,
        reviews: 269,
        description: "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
        bestPrice: true,
        freeCancel: true,
        duration: "2 Days 1 Nights",
        oldPrice: 1200,
        price: 114,
        type: "Cultural Tours"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop",
        badge: "FEATURED",
        badgeColor: "#5735c0",
        location: "Paris, France",
        title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        rating: 4.8,
        reviews: 269,
        description: "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
        bestPrice: true,
        freeCancel: true,
        duration: "2 Days 1 Nights",
        oldPrice: 1200,
        price: 114,
        type: "Food Tours"
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop",
        badge: "FEATURED",
        badgeColor: "#5735c0",
        location: "Paris, France",
        title: "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        rating: 4.8,
        reviews: 269,
        description: "The Phi Phi archipelago is a must-visit while in Phuket, and this speedboat trip.",
        bestPrice: true,
        freeCancel: true,
        duration: "2 Days 1 Nights",
        oldPrice: 1200,
        price: 114,
        type: "City Tours"
    }
];

const initialState = {
    tours: initialToursData,
};

export const toursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {
        addTour: (state, action) => {
            const maxId = state.tours.reduce((max, tour) => Math.max(max, tour.id), 0);
            const newTour = {
                ...action.payload,
                id: maxId + 1,
            };
            state.tours.unshift(newTour);
        },
    },
});

export const { addTour } = toursSlice.actions;

export default toursSlice.reducer;
