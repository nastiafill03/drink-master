import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories, selectIngredients } from '../../redux/filters/filtersSlice';
import CustomSelect from '../CustomSelect/CustomSelect';
import searchIcon from '../../assets/search-icon.svg';
import s from './DrinksSearch.module.css';

const DrinksSearch = ({ params, onChange }) => {
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  const [keyword, setKeyword] = useState(params.keyword ?? '');

  const handleSearch = () => onChange({ ...params, keyword, page: 1 });
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  const categoryOptions = categories.map((c) => ({ value: c, label: c }));
  const ingredientOptions = ingredients.map((i) => ({
    value: i.title ?? i,
    label: i.title ?? i,
  }));

  return (
    <div className={s.wrap}>
      <div className={s.inputWrap}>
        <input
          className={s.input}
          placeholder='Enter the text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type='button' className={s.searchBtn} onClick={handleSearch} aria-label='Search'>
          <img src={searchIcon} alt='' width={20} height={20} className={s.searchIcon} />
        </button>
      </div>

      <CustomSelect
        value={params.category ?? ''}
        onChange={(val) => onChange({ ...params, category: val, page: 1 })}
        options={categoryOptions}
        placeholder='All categories'
      />

      <CustomSelect
        value={params.ingredient ?? ''}
        onChange={(val) => onChange({ ...params, ingredient: val, page: 1 })}
        options={ingredientOptions}
        placeholder='Ingredients'
      />
    </div>
  );
};
export default DrinksSearch;
