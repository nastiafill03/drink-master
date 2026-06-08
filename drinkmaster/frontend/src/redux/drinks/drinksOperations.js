import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchDrinksThunk = createAsyncThunk(
  'drinks/fetchAll',
  async (params, thunkAPI) => {
    try {
      const res = await api.searchDrinks(params);
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const fetchMainPageThunk = createAsyncThunk(
  'drinks/mainPage',
  async (_, thunkAPI) => {
    try {
      const res = await api.getMainPage();
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const fetchPopularThunk = createAsyncThunk(
  'drinks/popular',
  async (_, thunkAPI) => {
    try {
      const res = await api.getPopular();
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const fetchDrinkByIdThunk = createAsyncThunk(
  'drink/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await api.getDrinkById(id);
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const addOwnDrinkThunk = createAsyncThunk(
  'myDrinks/add',
  async (formData, thunkAPI) => {
    try {
      const res = await api.addOwnDrink(formData);
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const addFavoriteThunk = createAsyncThunk(
  'favorites/add',
  async (drinkId, thunkAPI) => {
    try {
      const res = await api.addFavoriteDrink(drinkId);
      return res.data;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);

export const removeFavoriteThunk = createAsyncThunk(
  'favorites/remove',
  async (drinkId, thunkAPI) => {
    try {
      await api.removeFavoriteDrink(drinkId);
      return drinkId;
    } catch (err) { return thunkAPI.rejectWithValue(err.response.data.message); }
  }
);
