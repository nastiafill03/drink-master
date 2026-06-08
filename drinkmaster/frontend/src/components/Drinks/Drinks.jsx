import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchDrinksThunk } from '../../redux/drinks/drinksOperations';
import { fetchFiltersThunk } from '../../redux/filters/filtersOperations';
import { selectDrinks, selectTotalPages, selectDrinksLoading } from '../../redux/drinks/drinksSlice';
import { selectUser } from '../../redux/auth/authSlice';
import { differenceInYears } from 'date-fns';
import DrinksSearch from '../DrinksSearch/DrinksSearch';
import DrinksList from '../DrinksList/DrinksList';
import Paginator from '../Paginator/Paginator';
import Loader from '../Loader/Loader';
import s from './Drinks.module.css';

const Drinks = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const drinks = useSelector(selectDrinks);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectDrinksLoading);
  const user = useSelector(selectUser);

  const underage = user?.birthDate
    ? differenceInYears(new Date(), new Date(user.birthDate)) < 18
    : false;

  const [params, setParams] = useState({
    keyword: searchParams.get('keyword') ?? '',
    category: searchParams.get('category') ?? '',
    ingredient: searchParams.get('ingredient') ?? '',
    page: Number(searchParams.get('page')) || 1,
    limit: 12,
  });

  useEffect(() => {
    dispatch(fetchFiltersThunk());
  }, [dispatch]);

  useEffect(() => {
    const query = { ...params };
    if (underage) query.alcoholic = 'Non alcoholic';
    Object.keys(query).forEach((k) => !query[k] && delete query[k]);
    dispatch(fetchDrinksThunk(query));
    setSearchParams(query);
  }, [params, dispatch, underage, setSearchParams]);

  return (
    <div className={s.wrap}>
      {isLoading && <Loader />}
      <DrinksSearch params={params} onChange={setParams} />
      <DrinksList drinks={drinks} compact />
      <Paginator
        page={params.page}
        totalPages={totalPages}
        onPage={(p) => setParams((prev) => ({ ...prev, page: p }))}
      />
    </div>
  );
};
export default Drinks;
