import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSlice';
import { selectFavorites } from '../../redux/favorites/favoritesSlice';
import { addFavoriteThunk, removeFavoriteThunk } from '../../redux/favorites/favoritesOperations';
import MotivatingModal from '../MotivatingModal/MotivatingModal';
import { getDrinkImage, handleDrinkImageError } from '../../utils/drinkImage';
import s from './DrinkPageHero.module.css';

const DrinkPageHero = ({ drink }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);
  const [motivationType, setMotivationType] = useState(null);
  const [favoriteOverride, setFavoriteOverride] = useState(null);
  const favoriteFromData = favorites.some((f) => f._id === drink._id) ||
    drink.users?.some((id) => id.toString() === user?._id?.toString());
  const isFav = favoriteOverride ?? favoriteFromData;

  const toggleFav = async () => {
    if (isFav) {
      await dispatch(removeFavoriteThunk(drink._id)).unwrap();
      setFavoriteOverride(false);
    } else {
      const result = await dispatch(addFavoriteThunk(drink._id)).unwrap();
      setFavoriteOverride(true);
      const count = result.favoritesCount;
      if (count === 1) setMotivationType(1);
      else if (count === 10) setMotivationType(2);
    }
  };

  return (
    <>
      <div className={s.hero}>
        <div className={s.info}>
          <h1 className={s.title}>{drink.drink}</h1>
          <div className={s.tags}>
            {drink.glass && <span className={s.tag}>{drink.glass}</span>}
            {drink.alcoholic && <span className={s.tag}>{drink.alcoholic}</span>}
            {drink.category && <span className={s.tag}>{drink.category}</span>}
          </div>
          {drink.description && <p className={s.desc}>{drink.description}</p>}
          {isLoggedIn && (
            <button
              type='button'
              className={`${s.favBtn} ${isFav ? s.active : ''}`}
              onClick={toggleFav}
            >
              {isFav ? 'Remove from favorites' : 'Add to favorite drinks'}
            </button>
          )}
        </div>
        <div className={s.imgWrap}>
          <img
            src={getDrinkImage(drink.drinkThumb)}
            alt={drink.drink}
            className={s.img}
            onError={handleDrinkImageError}
          />
        </div>
      </div>
      {motivationType && <MotivatingModal type={motivationType} onClose={() => setMotivationType(null)} />}
    </>
  );
};
export default DrinkPageHero;
