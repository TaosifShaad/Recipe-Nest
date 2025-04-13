import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './FavouritesSlice';

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
    },
});
