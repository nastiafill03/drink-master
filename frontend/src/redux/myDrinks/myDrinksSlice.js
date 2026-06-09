import { createSlice } from '@reduxjs/toolkit';
import { fetchMyDrinksThunk, addMyDrinkThunk, removeMyDrinkThunk } from './myDrinksOperations';

const myDrinksSlice = createSlice({
  name: 'myDrinks',
  initialState: {
    myDrinks: [],
    total: 0,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDrinksThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyDrinksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.myDrinks = action.payload.drinks ?? action.payload;
        state.total = action.payload.total ?? 0;
        state.totalPages = action.payload.totalPages ?? 0;
      })
      .addCase(fetchMyDrinksThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addMyDrinkThunk.fulfilled, (state, action) => {
        state.myDrinks.unshift(action.payload);
        state.total += 1;
      })
      .addCase(removeMyDrinkThunk.fulfilled, (state, action) => {
        state.myDrinks = state.myDrinks.filter((d) => d._id !== action.payload);
        state.total = Math.max(0, state.total - 1);
      });
  },
});

export default myDrinksSlice.reducer;

export const selectMyDrinks = (state) => state.myDrinks.myDrinks;
export const selectMyDrinksTotal = (state) => state.myDrinks.total;
export const selectMyDrinksTotalPages = (state) => state.myDrinks.totalPages;
export const selectMyDrinksLoading = (state) => state.myDrinks.isLoading;
export const selectMyDrinksError = (state) => state.myDrinks.error;
