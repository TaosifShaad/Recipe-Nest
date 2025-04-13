import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: [],
    reducers: {
        // Adding a recipe
        addFavorite(state, action) {
            const existing = state.find(recipe => recipe.id === action.payload.id);
            if (!existing) {
                state.push(action.payload);
            }
        },
        // Removing a recipe
        removeFavorite(state, action) {
            return state.filter(recipe => recipe.id !== action.payload.id);
        },
        // Clearing the list.
        clearFavorites() {
            return [];
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
