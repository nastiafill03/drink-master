import { useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import plusIcon from '../../assets/plus-icon.svg';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addMyDrinkThunk } from '../../redux/myDrinks/myDrinksOperations';
import toast from 'react-hot-toast';
import DrinkDescriptionFields from '../DrinkDescriptionFields/DrinkDescriptionFields';
import DrinkIngredientsFields from '../DrinkIngredientsFields/DrinkIngredientsFields';
import RecipePreparation from '../RecipePreparation/RecipePreparation';
import s from './AddDrinkForm.module.css';

const schema = Yup.object({
  drink: Yup.string().min(2).required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  glass: Yup.string().required('Glass is required'),
  alcoholic: Yup.string().required('Type is required'),
  instructions: Yup.string().required('Recipe is required'),
  ingredients: Yup.array().of(
    Yup.object({ title: Yup.string().required('This field cannot be empty'), measure: Yup.string().required('This field cannot be empty') })
  ).min(1, 'Add at least one ingredient'),
});

const initial = {
  drink: '',
  description: '',
  category: '',
  glass: '',
  alcoholic: '',
  instructions: '',
  ingredients: [{ title: '', measure: '' }],
};

const AddDrinkForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const fileRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (k === 'ingredients') {
          fd.append('ingredients', JSON.stringify(v));
        } else {
          fd.append(k, v);
        }
      });
      if (imageFile) fd.append('drinkThumb', imageFile);
      await dispatch(addMyDrinkThunk(fd)).unwrap();
      toast.success('Drink added!');
      resetForm();
      setImagePreview(null);
      setImageFile(null);
      onSuccess?.();
    } catch (err) {
      toast.error(err ?? 'Failed to add drink');
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initial} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, isSubmitting }) => (
        <Form className={s.form}>
          <div className={s.top}>
            <div className={s.imgSection}>
              <div className={s.imgWrap} onClick={() => fileRef.current.click()}>
                {imagePreview
                  ? <img src={imagePreview} alt='preview' className={s.preview} />
                  : <div className={s.imgPlaceholder}><img src={plusIcon} alt='' className={s.plusIcon} /><span className={s.addPhoto}>Add photo</span></div>
                }
              </div>
              <input ref={fileRef} type='file' accept='image/*' hidden onChange={handleFile} />
            </div>
            <div className={s.descSection}>
              <DrinkDescriptionFields />
            </div>
          </div>

          <div className={s.bottomSection}>
            <DrinkIngredientsFields values={values} />

            <RecipePreparation variant='add' />

            <div className={s.actions}>
              <button type='submit' className={s.submitBtn} disabled={isSubmitting}>
                Add
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default AddDrinkForm;
