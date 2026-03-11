import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./counter/userSlice";
import toursReducer from "./tours/toursSlice";
import authReducer from "./auth/authSlice";
import favoritesReducer from "./favorites/favoritesSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["user", "tours", "auth", "favorites"], // Persist user, tours, auth, and favorites
};

const rootReducer = combineReducers({
    user: userReducer,
    tours: toursReducer,
    auth: authReducer,
    favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
