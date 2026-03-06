import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tours: [],
};

export const toursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {
        setTours: (state, action) => {
            state.tours = action.payload;
        },
        addTour: (state, action) => {
            state.tours.unshift(action.payload);
        },
    },
});

export const { setTours, addTour } = toursSlice.actions;

export default toursSlice.reducer;
