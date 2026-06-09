import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchMyDrinksThunk, removeMyDrinkThunk } from '../../redux/myDrinks/myDrinksOperations';
import {
  selectMyDrinks,
  selectMyDrinksError,
  selectMyDrinksLoading,
  selectMyDrinksTotalPages,
} from '../../redux/myDrinks/myDrinksSlice';
import PageTitle from '../../components/PageTitle/PageTitle';
import DrinksList from '../../components/DrinksList/DrinksList';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import s from './MyDrinksPage.module.css';
import blueCocktail from '../../assets/blue-cocktail.png';

const MyDrinksPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const myDrinks = useSelector(selectMyDrinks);
  const totalPages = useSelector(selectMyDrinksTotalPages);
  const isLoading = useSelector(selectMyDrinksLoading);
  const error = useSelector(selectMyDrinksError);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    dispatch(fetchMyDrinksThunk({ page, limit: 12 }));
    setSearchParams(page > 1 ? { page } : {});
  }, [dispatch, page, setSearchParams]);

  const handleDelete = async (id) => {
    try {
      await dispatch(removeMyDrinkThunk(id)).unwrap();
      toast.success('Drink removed');
    } catch {
      toast.error('Failed to remove drink');
    }
  };

  return (
    <div className={s.page}>
      {isLoading && <Loader />}
      <PageTitle>My drinks</PageTitle>
      {error && !isLoading
        ? <p className={s.emptyText}>{error}</p>
        : myDrinks.length === 0 && !isLoading
        ? (
          <div className={s.empty}>
            <img src={blueCocktail} alt='' className={s.emptyImg} />
            <p className={s.emptyText}>You haven't added any cocktails yet.</p>
          </div>
        )
        : <>
          <DrinksList drinks={myDrinks} onDelete={handleDelete} />
          <Paginator page={page} totalPages={totalPages} onPage={setPage} />
        </>
      }
    </div>
  );
};
export default MyDrinksPage;
