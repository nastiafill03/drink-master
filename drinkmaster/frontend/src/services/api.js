import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://drinkmaster-backend-30wn.onrender.com';

const api = axios.create({ baseURL: BASE_URL });
export const setToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
export const clearToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

// ── AUTH ──────────────────────────────────────────────────
export const signup = (data) => api.post('/auth/signup', data);
export const signin = (data) => api.post('/auth/signin', data);
export const signout = () => api.post('/auth/signout');

// ── USERS ─────────────────────────────────────────────────
export const getCurrent = () => api.get('/users/current');
export const updateUser = (data) => api.patch('/users/update', data);
export const subscribe = (data) => api.post('/users/subscribe', data);

// ── FILTERS ───────────────────────────────────────────────
export const getCategories = () => api.get('/filters/categories');
export const getIngredients = () => api.get('/filters/ingredients');
export const getGlasses = () => api.get('/filters/glasses');

// ── DRINKS ────────────────────────────────────────────────
export const getMainPage = () => api.get('/drinks/mainpage');
export const getPopular = () => api.get('/drinks/popular');
export const searchDrinks = (params) => api.get('/drinks/search', { params });
export const getDrinkById = (id) => api.get(`/drinks/${id}`);

// ── OWN DRINKS ────────────────────────────────────────────
export const getOwnDrinks = (params) => api.get('/drinks/own', { params });
export const addOwnDrink = (data) => api.post('/drinks/own/add', data);
export const removeOwnDrink = (drinkId) => api.delete('/drinks/own/remove', { data: { drinkId } });

// ── FAVORITE DRINKS ───────────────────────────────────────
export const getFavoriteDrinks = (params) => api.get('/drinks/favorite', { params });
export const addFavoriteDrink = (drinkId) => api.post('/drinks/favorite/add', { drinkId });
export const removeFavoriteDrink = (drinkId) => api.delete('/drinks/favorite/remove', { data: { drinkId } });

export default api;
