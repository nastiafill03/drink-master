import s from './DrinkIngredientsList.module.css';

const getIngredientThumb = (item) => (
  item.ingredientId?.ingredientThumb ?? item.ingredientThumb ?? null
);

const DrinkIngredientsList = ({ ingredients }) => {
  if (!ingredients?.length) return null;

  return (
    <section className={s.section}>
      <h2 className={s.title}>Ingredients</h2>
      <ul className={s.list}>
        {ingredients.map((item, i) => {
          const ingredientThumb = getIngredientThumb(item);

          return (
            <li key={i}>
              <div className={s.card}>
                {ingredientThumb
                  ? <img src={ingredientThumb} alt={item.title} className={s.img} />
                  : <div className={s.placeholder} />
                }
              </div>
              <div className={s.bottom}>
                <span className={s.name}>{item.title ?? '—'}</span>
                <span className={s.measure}>{item.measure}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default DrinkIngredientsList;
