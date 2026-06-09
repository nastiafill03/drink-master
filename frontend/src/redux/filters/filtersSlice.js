import { createSlice } from '@reduxjs/toolkit';
import { fetchFiltersThunk } from './filtersOperations';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    categories: [],
    ingredients: [],
    glasses: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersThunk.pending, (state) => { state.isLoading = true; })
      .addCase(fetchFiltersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.categories;
        state.ingredients = action.payload.ingredients;
        state.glasses = action.payload.glasses;
      })
      .addCase(fetchFiltersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default filtersSlice.reducer;

export const selectCategories = (state) => state.filters.categories;
export const selectIngredients = (state) => state.filters.ingredients;
export const selectGlasses = (state) => state.filters.glasses;
export const selectFiltersLoading = (state) => state.filters.isLoading;
