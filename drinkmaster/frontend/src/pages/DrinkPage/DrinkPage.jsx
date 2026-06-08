import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinkByIdThunk } from '../../redux/drink/drinkOperations';
import { clearDrink, selectDrink, selectDrinkLoading } from '../../redux/drink/drinkSlice';
import DrinkPageHero from '../../components/DrinkPageHero/DrinkPageHero';
import DrinkIngredientsList from '../../components/DrinkIngredientsList/DrinkIngredientsList';
import RecipePreparation from '../../components/RecipePreparation/RecipePreparation';
import Loader from '../../components/Loader/Loader';
import s from './DrinkPage.module.css';

const DrinkPage = () => {
  const { drinkId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const drink = useSelector(selectDrink);
  const isLoading = useSelector(selectDrinkLoading);

  useEffect(() => {
    dispatch(fetchDrinkByIdThunk(drinkId));
    return () => dispatch(clearDrink());
  }, [drinkId, dispatch]);

  if (isLoading) return <Loader />;
  if (!drink) return null;

  return (
    <div className={s.page}>
      <button type='button' className={s.back} onClick={() => navigate(-1)}>← Back</button>
      <DrinkPageHero drink={drink} />
      <DrinkIngredientsList ingredients={drink.ingredients} />
      <RecipePreparation instructions={drink.instructions} variant='drink' />
    </div>
  );
};
export default DrinkPage;
