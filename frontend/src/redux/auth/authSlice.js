import { createSlice } from '@reduxjs/toolkit';
import { signupThunk, signinThunk, signoutThunk, refreshUserThunk } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { _id: null, name: null, email: null, avatarURL: null, birthDate: null },
    token: localStorage.getItem('token') ?? null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
        if (!localStorage.getItem('drinkmaster_signup_date')) {
          localStorage.setItem('drinkmaster_signup_date', new Date().toISOString());
        }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(signinThunk.rejected, (state, action) => { state.error = action.payload; })
      .addCase(signoutThunk.fulfilled, (state) => {
        state.user = { _id: null, name: null, email: null, avatarURL: null, birthDate: null };
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
      })
      .addCase(signoutThunk.rejected, (state) => {
        state.user = { _id: null, name: null, email: null, avatarURL: null, birthDate: null };
        state.token = null; state.isLoggedIn = false;
        localStorage.removeItem('token');
      })
      .addCase(refreshUserThunk.pending, (state) => { state.isRefreshing = true; })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.rejected, (state) => { state.isRefreshing = false; })
  },
});

export default authSlice.reducer;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
