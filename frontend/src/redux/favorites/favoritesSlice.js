import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoritesThunk, addFavoriteThunk, removeFavoriteThunk } from './favoritesOperations';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    total: 0,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favorites = action.payload.drinks ?? action.payload;
        state.total = action.payload.total ?? 0;
        state.totalPages = action.payload.totalPages ?? 0;
      })
      .addCase(fetchFavoritesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        const drink = action.payload.drink ?? action.payload;
        state.favorites.push(drink);
        state.total = action.payload.favoritesCount ?? state.total + 1;
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter((d) => d._id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      });
  },
});

export default favoritesSlice.reducer;

export const selectFavorites = (state) => state.favorites.favorites;
export const selectFavoritesTotal = (state) => state.favorites.total;
export const selectFavoritesTotalPages = (state) => state.favorites.totalPages;
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;
