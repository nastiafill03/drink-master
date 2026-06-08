import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMainPageThunk } from '../../redux/drinks/drinksOperations';
import { selectMainPage } from '../../redux/drinks/drinksSlice';
import { selectUser } from '../../redux/auth/authSlice';
import { differenceInYears } from 'date-fns';
import { getDrinkImage, handleDrinkImageError } from '../../utils/drinkImage';
import s from './PreviewDrinks.module.css';

const isUnderage = (birthDate) => {
  if (!birthDate) return false;
  return differenceInYears(new Date(), new Date(birthDate)) < 18;
};

const PreviewDrinks = () => {
  const dispatch = useDispatch();
  const mainPage = useSelector(selectMainPage);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchMainPageThunk());
  }, [dispatch]);

  const categories = mainPage.map(({ category, drinks }) => [category, drinks]);

  const underage = isUnderage(user?.birthDate);

  return (
    <section className={s.section}>
      {categories.map(([category, drinks]) => {
        const filtered = underage
          ? drinks.filter((d) => d.alcoholic === 'Non alcoholic')
          : drinks;
        if (!filtered.length) return null;
        return (
          <div key={category} className={s.group}>
            <div className={s.groupHeader}>
              <h2 className={s.catTitle}>{category}</h2>
            </div>
            <ul className={s.list}>
              {filtered.slice(0, 3).map((drink) => (
                <li key={drink._id} className={s.card}>
                  <Link to={`/drink/${drink._id}`} className={s.cardLink}>
                    <img
                      src={getDrinkImage(drink.drinkThumb)}
                      alt={drink.drink}
                      className={s.img}
                      onError={handleDrinkImageError}
                    />
                    <div className={s.cardBottom}>
                      <span className={s.name}>{drink.drink}</span>
                      <span className={s.more}>See more</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
           
          </div>
        );
      })}
       <Link to={'/drinks'} className={s.seeOthers}>
              Other drinks
            </Link>
    </section>
  );
};
export default PreviewDrinks;
