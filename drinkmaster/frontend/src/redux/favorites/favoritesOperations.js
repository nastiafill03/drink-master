import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchFavoritesThunk = createAsyncThunk(
  'favorites/fetchAll',
  async (params, thunkAPI) => {
    try {
      const res = await api.getFavoriteDrinks(params);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);

export const addFavoriteThunk = createAsyncThunk(
  'favorites/add',
  async (drinkId, thunkAPI) => {
    try {
      const res = await api.addFavoriteDrink(drinkId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);

export const removeFavoriteThunk = createAsyncThunk(
  'favorites/remove',
  async (drinkId, thunkAPI) => {
    try {
      await api.removeFavoriteDrink(drinkId);
      return drinkId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);
