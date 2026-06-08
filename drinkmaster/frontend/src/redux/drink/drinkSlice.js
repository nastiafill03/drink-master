import { createSlice } from '@reduxjs/toolkit';
import { fetchDrinkByIdThunk } from './drinkOperations';

const drinkSlice = createSlice({
  name: 'drink',
  initialState: {
    drink: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearDrink(state) { state.drink = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrinkByIdThunk.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchDrinkByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drink = action.payload;
      })
      .addCase(fetchDrinkByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDrink } = drinkSlice.actions;
export default drinkSlice.reducer;

export const selectDrink = (state) => state.drink.drink;
export const selectDrinkLoading = (state) => state.drink.isLoading;
export const selectDrinkError = (state) => state.drink.error;
