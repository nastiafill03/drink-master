import { Link } from 'react-router-dom';
import { getDrinkImage, handleDrinkImageError } from '../../utils/drinkImage';
import s from './DrinksItem.module.css';

const DrinksItem = ({ drink, onDelete, compact }) => (
  <li className={s.card}>
    <Link to={`/drink/${drink._id}`} className={s.imgLink}>
      <img
        src={getDrinkImage(drink.drinkThumb)}
        alt={drink.drink}
        className={compact ? s.imgCompact : s.img}
        onError={handleDrinkImageError}
      />
    </Link>
    <div className={compact ? s.contentCompact : s.content}>
      {compact ? (
        <>
          <h2 className={s.nameCompact}>{drink.drink}</h2>
          <Link to={`/drink/${drink._id}`} className={s.rowMore}>See more</Link>
        </>
      ) : (
        <>
          <div className={s.heading}>
            <h2 className={s.name}>{drink.drink}</h2>
            {drink.alcoholic && <p className={s.type}>{drink.alcoholic}</p>}
          </div>
          {drink.description && <p className={s.description}>{drink.description}</p>}
          <div className={s.actions}>
            <Link to={`/drink/${drink._id}`} className={s.more}>See more</Link>
            {onDelete && (
              <button
                type='button'
                className={s.delBtn}
                onClick={() => onDelete(drink._id)}
                aria-label='Delete drink'
              >
                <span className={s.delIcon} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  </li>
);
export default DrinksItem;
