import { Field, ErrorMessage, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { selectCategories, selectGlasses } from '../../redux/filters/filtersSlice';
import { selectUser } from '../../redux/auth/authSlice';
import { differenceInYears } from 'date-fns';
import CustomSelect from '../CustomSelect/CustomSelect';
import s from './DrinkDescriptionFields.module.css';

const DrinkDescriptionFields = () => {
  const { values, setFieldValue } = useFormikContext();
  const categories = useSelector(selectCategories);
  const glasses = useSelector(selectGlasses);
  const user = useSelector(selectUser);
  const underage = user?.birthDate
    ? differenceInYears(new Date(), new Date(user.birthDate)) < 18
    : false;

  const categoryOptions = categories.map((c) => ({ value: c, label: c }));
  const glassOptions = glasses.map((g) => ({ value: g, label: g }));

  return (
    <div className={s.fields}>
      <div className={s.field}>
        <Field name='drink' placeholder='Enter item title' className={s.input} />
        <ErrorMessage name='drink' component='span' className={s.error} />
      </div>

      <div className={s.field}>
        <Field name='description' placeholder='Enter about recipe' className={s.input} as='textarea' rows={1} />
        <ErrorMessage name='description' component='span' className={s.error} />
      </div>

      <div className={s.field}>
        <CustomSelect
          variant='underline'
          value={values.category}
          onChange={(val) => setFieldValue('category', val)}
          options={categoryOptions}
          placeholder='Category'
          className={s.input}
        />
        <ErrorMessage name='category' component='span' className={s.error} />
      </div>

      <div className={s.field}>
        <CustomSelect
          variant='underline'
          value={values.glass}
          onChange={(val) => setFieldValue('glass', val)}
          options={glassOptions}
          placeholder='Glass'
          className={s.input}
        />
        <ErrorMessage name='glass' component='span' className={s.error} />
      </div>

      <div className={s.field}>
        <div className={s.radioGroup}>
          <label className={s.radio}>
            <Field type='radio' name='alcoholic' value='Alcoholic' disabled={underage} />
            <span>Alcoholic</span>
          </label>
          <label className={s.radio}>
            <Field type='radio' name='alcoholic' value='Non alcoholic' />
            <span>Non alcoholic</span>
          </label>
        </div>
        <ErrorMessage name='alcoholic' component='span' className={s.error} />
      </div>
    </div>
  );
};
export default DrinkDescriptionFields;
