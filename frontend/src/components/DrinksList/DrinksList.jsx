import DrinksItem from '../DrinksItem/DrinksItem';
import s from './DrinksList.module.css';

const DrinksList = ({ drinks, onDelete, compact }) => {
  if (!drinks?.length) return <p className={s.empty}>No drinks found.</p>;

  return (
    <ul className={compact ? s.listCompact : s.list}>
      {drinks.map((drink) => (
        <DrinksItem
          key={drink._id}
          drink={drink}
          onDelete={onDelete}
          compact={compact}
        />
      ))}
    </ul>
  );
};
export default DrinksList;
