import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

export const fetchDrinkByIdThunk = createAsyncThunk(
  'drink/fetchById',
  async (id, thunkAPI) => {
    try {
      const res = await api.getDrinkById(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ?? err.message);
    }
  }
);
