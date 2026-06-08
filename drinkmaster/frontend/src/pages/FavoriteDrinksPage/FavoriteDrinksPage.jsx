import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchFavoritesThunk, removeFavoriteThunk } from '../../redux/favorites/favoritesOperations';
import {
  selectFavorites,
  selectFavoritesError,
  selectFavoritesLoading,
  selectFavoritesTotalPages,
} from '../../redux/favorites/favoritesSlice';
import PageTitle from '../../components/PageTitle/PageTitle';
import DrinksList from '../../components/DrinksList/DrinksList';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import blueCocktail from '../../assets/blue-cocktail.png';
import toast from 'react-hot-toast';
import s from './FavoriteDrinksPage.module.css';

const FavoriteDrinksPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const favorites = useSelector(selectFavorites);
  const totalPages = useSelector(selectFavoritesTotalPages);
  const isLoading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectFavoritesError);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    dispatch(fetchFavoritesThunk({ page, limit: 12 }));
    setSearchParams(page > 1 ? { page } : {});
  }, [dispatch, page, setSearchParams]);

  const handleRemove = async (id) => {
    try {
      await dispatch(removeFavoriteThunk(id)).unwrap();
      toast.success('Removed from favorites');
    } catch {
      toast.error('Failed to remove');
    }
  };

  return (
    <div className={s.page}>
      {isLoading && <Loader />}
      <PageTitle>Favorites</PageTitle>
      {error && !isLoading
        ? <p className={s.emptyText}>{error}</p>
        : favorites.length === 0 && !isLoading
        ? (
          <div className={s.empty}>
            <img src={blueCocktail} alt='' className={s.emptyImg} />
            <p className={s.emptyText}>You haven't added any favorite cocktails yet.</p>
          </div>
        )
        : <>
          <DrinksList drinks={favorites} onDelete={handleRemove} />
          <Paginator page={page} totalPages={totalPages} onPage={setPage} />
        </>
      }
    </div>
  );
};
export default FavoriteDrinksPage;
