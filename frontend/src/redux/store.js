import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import drinksReducer from './drinks/drinksSlice';
import favoritesReducer from './favorites/favoritesSlice';
import myDrinksReducer from './myDrinks/myDrinksSlice';
import drinkReducer from './drink/drinkSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    auth:      authReducer,
    drinks:    drinksReducer,
    favorites: favoritesReducer,
    myDrinks:  myDrinksReducer,
    drink:     drinkReducer,
    filters:   filtersReducer,
  },
});
