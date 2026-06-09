import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPopularThunk } from '../../redux/drinks/drinksOperations';
import { selectUser } from '../../redux/auth/authSlice';
import { differenceInYears } from 'date-fns';
import { getDrinkImage, handleDrinkImageError } from '../../utils/drinkImage';
import s from './PopularDrinks.module.css';

const isUnderage = (birthDate) => {
  if (!birthDate) return false;
  return differenceInYears(new Date(), new Date(birthDate)) < 18;
};

const PopularDrinks = () => {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks.popular ?? []);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPopularThunk());
  }, [dispatch]);

  const underage = isUnderage(user?.birthDate);
  const filtered = underage ? drinks.filter((d) => d.alcoholic === 'Non alcoholic') : drinks;

  return (
    <aside className={s.aside}>
      <h2 className={s.title}>Popular drinks</h2>
      <ul className={s.list}>
        {filtered.slice(0, 4).map((drink) => (
          <li key={drink._id}>
            <Link to={`/drink/${drink._id}`} className={s.item}>
              <img
                src={getDrinkImage(drink.drinkThumb)}
                alt={drink.drink}
                className={s.img}
                onError={handleDrinkImageError}
              />
              <div className={s.info}>
                <span className={s.name}>{drink.drink}</span>
                <span className={s.cat}>{drink.description}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default PopularDrinks;
