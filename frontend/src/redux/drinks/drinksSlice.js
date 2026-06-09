import { createSlice } from '@reduxjs/toolkit';
import { fetchDrinksThunk, fetchMainPageThunk, fetchPopularThunk } from './drinksOperations';

const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    drinks: [],
    total: 0,
    totalPages: 0,
    mainPage: [],
    popular: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinksThunk.pending, (state) => { state.isLoading = true; })
      .addCase(fetchDrinksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drinks = action.payload.drinks;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDrinksThunk.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload;
      })
      .addCase(fetchMainPageThunk.fulfilled, (state, action) => {
        state.mainPage = action.payload;
      })
      .addCase(fetchPopularThunk.fulfilled, (state, action) => {
        state.popular = action.payload;
      });
  },
});
export default drinksSlice.reducer;

export const selectDrinks = (state) => state.drinks.drinks;
export const selectDrinksTotal = (state) => state.drinks.total;
export const selectTotalPages = (state) => state.drinks.totalPages;
export const selectMainPage = (state) => state.drinks.mainPage;
export const selectDrinksLoading = (state) => state.drinks.isLoading;
