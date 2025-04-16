import { createSlice } from '@reduxjs/toolkit';

const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: savedFavorites,
    reducers: {
        addFavorite(state, action) {
            // Prevent duplicate
            const exists = state.find((recipe) => recipe.id === action.payload.id);
            if (!exists) {
                state.push(action.payload);
                // Save updated state to localStorage
                localStorage.setItem('favorites', JSON.stringify(state));
            }
        },
        removeFavorite(state, action) {
            const newState = state.filter((recipe) => recipe.id !== action.payload.id);
            // Update localStorage
            localStorage.setItem('favorites', JSON.stringify(newState));
            return newState;
        },
        clearFavorites(state, action) {
            // Clear localStorage entry (Have not used it yet)
            localStorage.removeItem('favorites');
            return [];
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
