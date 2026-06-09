import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { refreshUserThunk } from './redux/auth/authOperations';
import { selectIsRefreshing } from './redux/auth/authSlice';

import SharedLayout from './layouts/SharedLayout';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import SigninPage from './pages/SigninPage/SigninPage';
import HomePage from './pages/HomePage/HomePage';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import DrinkPage from './pages/DrinkPage/DrinkPage';
import AddDrinkPage from './pages/AddDrinkPage/AddDrinkPage';
import MyDrinksPage from './pages/MyDrinksPage/MyDrinksPage';
import FavoriteDrinksPage from './pages/FavoriteDrinksPage/FavoriteDrinksPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage/TermsOfServicePage';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  if (isRefreshing) return null;

  return (
    <>
      <Toaster position='top-right' />
      <Routes>
        <Route path='/welcome' element={<PublicRoute component={WelcomePage} />} />
        <Route path='/signup' element={<PublicRoute component={SignupPage} />} />
        <Route path='/signin' element={<PublicRoute component={SigninPage} />} />
        <Route path='/' element={<PrivateRoute component={SharedLayout} />}>
          <Route path='home' element={<HomePage />} />
          <Route path='drinks' element={<DrinksPage />} />
          <Route path='drink/:drinkId' element={<DrinkPage />} />
          <Route path='add' element={<AddDrinkPage />} />
          <Route path='my' element={<MyDrinksPage />} />
          <Route path='favorites' element={<FavoriteDrinksPage />} />
          <Route path='privacy' element={<PrivacyPolicyPage />} />
          <Route path='terms' element={<TermsOfServicePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
