import { FieldArray, Field, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../redux/filters/filtersSlice';
import CustomSelect from '../CustomSelect/CustomSelect';
import closeIcon from '../../assets/close-icon.svg';
import s from './DrinkIngredientsFields.module.css';

const DrinkIngredientsFields = ({ values }) => {
  const ingredients = useSelector(selectIngredients);
  const { setFieldValue, setFieldTouched, errors, touched, submitCount } = useFormikContext();

  const ingredientOptions = ingredients.map((ing) => {
    const title = ing.title ?? ing;
    return { value: title, label: title };
  });

  const getError = (field, i) => {
    const err = errors.ingredients?.[i]?.[field];
    const isTouched = touched.ingredients?.[i]?.[field];
    return err && (isTouched || submitCount > 0) ? err : null;
  };

  return (
    <FieldArray name='ingredients'>
      {({ push, remove }) => (
        <div className={s.wrap}>
          <div className={s.header}>
            <h3 className={s.title}>Ingredients</h3>
            <div className={s.counter}>
              <button
                type='button'
                className={s.countBtn}
                onClick={() => values.ingredients.length > 0 && remove(values.ingredients.length - 1)}
              >−</button>
              <span className={s.count}>{values.ingredients.length}</span>
              <button
                type='button'
                className={s.countBtn}
                onClick={() => push({ title: '', measure: '' })}
              >+</button>
            </div>
          </div>

          {values.ingredients.map((ing, i) => (
            <div key={i} className={s.row}>
              <div className={s.selectField}>
                <CustomSelect
                  variant='field'
                  value={ing.title}
                  onChange={(val) => {
                    setFieldValue(`ingredients[${i}].title`, val);
                    setFieldTouched(`ingredients[${i}].title`, true, false);
                  }}
                  options={ingredientOptions}
                  placeholder='Ingredient'
                />
                {getError('title', i) && <span className={s.error}>{getError('title', i)}</span>}
              </div>
              <div className={s.measureField}>
                <Field name={`ingredients[${i}].measure`} placeholder='1 cl' className={s.input} />
                {getError('measure', i) && <span className={s.error}>{getError('measure', i)}</span>}
              </div>
              <button type='button' className={s.removeBtn} onClick={() => remove(i)} aria-label='Remove ingredient'>
                <img src={closeIcon} alt='' width={20} height={20} />
              </button>
            </div>
          ))}

          {values.ingredients.length === 0 && (
            <p className={s.empty}>Add at least one ingredient</p>
          )}
        </div>
      )}
    </FieldArray>
  );
};
export default DrinkIngredientsFields;
