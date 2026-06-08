import { Field, ErrorMessage } from 'formik';
import receipeThumb from '../../assets/receipe-thumb.png';
import s from './RecipePreparation.module.css';

const RecipePreparation = ({ instructions, variant = 'drink' }) => {
  if (variant === 'add') {
    return (
      <div className={s.addWrap}>
        <h3 className={s.addTitle}>Recipe Preparation</h3>
        <Field
          name='instructions'
          as='textarea'
          rows={6}
          placeholder='Enter the recipe'
          className={s.textarea}
        />
        <ErrorMessage name='instructions' component='span' className={s.addError} />
      </div>
    );
  }

  if (!instructions) return null;

  return (
    <section className={s.section}>
      <h2 className={s.title}>Recipe preparation</h2>
      <div className={s.grid}>
        <div className={s.imgCol}>
          <img src={receipeThumb} alt='recipe' className={s.img} />
        </div>
        <div className={s.textCol}>
          <p className={s.text}>{instructions}</p>
        </div>
      </div>
    </section>
  );
};
export default RecipePreparation;
