import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';
import { setToken, clearToken } from '../../services/api';

// Реєстрація
export const signupThunk = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const res = await api.signup(data);
    setToken(res.data.token);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Логін
export const signinThunk = createAsyncThunk('auth/signin', async (data, thunkAPI) => {
  try {
    const res = await api.signin(data);
    setToken(res.data.token);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Логаут
export const signoutThunk = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    await api.signout();
    clearToken();
  } catch (err) {
    
    clearToken();
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// Відновлення сесії при перезавантаженні сторінки
export const refreshUserThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) return thunkAPI.rejectWithValue('No token');
  setToken(token);
  const res = await api.getCurrent();
  return res.data;
});

