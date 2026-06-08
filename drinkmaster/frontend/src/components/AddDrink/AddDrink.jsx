import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFiltersThunk } from '../../redux/filters/filtersOperations';
import AddDrinkForm from '../AddDrinkForm/AddDrinkForm';
import s from './AddDrink.module.css';

const AddDrink = ({ onSuccess }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltersThunk());
  }, [dispatch]);

  return (
    <div className={s.wrap}>
      <AddDrinkForm onSuccess={onSuccess} />
    </div>
  );
};
export default AddDrink;
