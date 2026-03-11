import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchFavoritesAxiosCall,
    addFavoriteAxiosCall,
    removeFavoriteAxiosCall
} from "../../helper/helperapi";

export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchFavoritesAxiosCall();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const toggleFavorite = createAsyncThunk(
    "favorites/toggleFavorite",
    async ({ tourId, isFavorite }, { rejectWithValue }) => {
        try {
            if (isFavorite) {
                await removeFavoriteAxiosCall(tourId);
                return { tourId, removed: true };
            } else {
                const response = await addFavoriteAxiosCall({ tourId });
                return { tourId, data: response.data, removed: false };
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearFavorites: (state) => {
            state.items = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                if (action.payload.removed) {
                    state.items = state.items.filter(item =>
                        String(item.id) !== String(action.payload.tourId) &&
                        String(item.tour_id) !== String(action.payload.tourId)
                    );
                } else {
                    // Assuming API returns the tour object on add
                    state.items.push(action.payload.data);
                }
            });
    },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
