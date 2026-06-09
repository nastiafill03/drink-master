import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchMyDrinksThunk = createAsyncThunk(
  'myDrinks/fetchAll',
  async (params, thunkAPI) => {
    try {
      const res = await api.getOwnDrinks(params);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);

export const addMyDrinkThunk = createAsyncThunk(
  'myDrinks/add',
  async (formData, thunkAPI) => {
    try {
      const res = await api.addOwnDrink(formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);

export const removeMyDrinkThunk = createAsyncThunk(
  'myDrinks/remove',
  async (drinkId, thunkAPI) => {
    try {
      await api.removeOwnDrink(drinkId);
      return drinkId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);
