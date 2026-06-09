import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchFiltersThunk = createAsyncThunk(
  'filters/fetchAll',
  async (_, thunkAPI) => {
    try {
      const [categories, ingredients, glasses] = await Promise.all([
        api.getCategories(),
        api.getIngredients(),
        api.getGlasses(),
      ]);
      return {
        categories: categories.data,
        ingredients: ingredients.data,
        glasses: glasses.data,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);
