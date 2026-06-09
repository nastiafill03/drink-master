import { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../assets/calendar-icon.svg';
import correctIcon from '../../assets/correct-icon.svg';
import errorIcon from '../../assets/error-icon.svg';
import { subYears } from 'date-fns';
import s from './AuthForm.module.css';

const signupSchema = Yup.object({
  name: Yup.string().min(2, 'Min 2 chars').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  birthDate: Yup.date().required('Date of birth is required').max(new Date(), 'Invalid date'),
  password: Yup.string().min(8, 'Min 8 chars').required('Password is required'),
});

const signinSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Min 8 chars').required('Password is required'),
});

const AuthForm = ({ type, onSubmit }) => {
  const datePickerRef = useRef(null);
  const isSignup = type === 'signup';
  const schema = isSignup ? signupSchema : signinSchema;
  const initialValues = isSignup
    ? { name: '', email: '', birthDate: null, password: '' }
    : { email: '', password: '' };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur
      validateOnChange
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched, isSubmitting }) => {
        const getStatus = (name) => {
          if (!touched[name]) return null;
          return errors[name] ? 'error' : 'success';
        };

        const getInputClassName = (name, extraClassName = '') => {
          const status = getStatus(name);
          return [
            s.input,
            extraClassName,
            status === 'error' ? s.inputError : '',
            status === 'success' ? s.inputSuccess : '',
          ].filter(Boolean).join(' ');
        };

        const renderStatusIcon = (name, extraClassName = '') => {
          const status = getStatus(name);
          if (!status) return null;

          return (
            <img
              src={status === 'error' ? errorIcon : correctIcon}
              alt=''
              className={`${s.statusIcon} ${extraClassName}`}
              aria-hidden='true'
            />
          );
        };

        return (
          <Form className={s.form}>
            {isSignup && (
              <div className={s.field}>
                <div className={s.inputWrap}>
                  <Field name='name' placeholder='Name' className={getInputClassName('name', s.inputWithIcon)} />
                  {renderStatusIcon('name')}
                </div>
                <ErrorMessage name='name' component='span' className={s.error} />
              </div>
            )}

            {isSignup && (
              <div className={s.field}>
                <div className={s.dateInputWrap}>
                  <DatePicker
                    ref={datePickerRef}
                    selected={values.birthDate}
                    onChange={(date) => {
                      setFieldValue('birthDate', date);
                      setFieldTouched('birthDate', true, true);
                    }}
                    onBlur={() => setFieldTouched('birthDate', true, true)}
                    placeholderText='dd/mm/yyyy'
                    className={getInputClassName('birthDate', s.dateInput)}
                    dateFormat='dd/MM/yyyy'
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={80}
                    openToDate={subYears(new Date(), 18)}
                  />
                  {renderStatusIcon('birthDate', s.dateStatusIcon)}
                  <button
                    type='button'
                    className={s.calendarButton}
                    aria-label='Open calendar'
                    onClick={() => datePickerRef.current?.setOpen(true)}
                  >
                    <img src={calendarIcon} alt='' />
                  </button>
                </div>
                <ErrorMessage name='birthDate' component='span' className={s.error} />
              </div>
            )}

            <div className={s.field}>
              <div className={s.inputWrap}>
                <Field name='email' type='email' placeholder='Email' className={getInputClassName('email', s.inputWithIcon)} />
                {renderStatusIcon('email')}
              </div>
              <ErrorMessage name='email' component='span' className={s.error} />
            </div>

            <div className={s.field}>
              <div className={s.inputWrap}>
                <Field name='password' type='password' placeholder='Password' className={getInputClassName('password', s.inputWithIcon)} />
                {renderStatusIcon('password')}
              </div>
              <ErrorMessage name='password' component='span' className={s.error} />
            </div>

            <button type='submit' className={s.btn} disabled={isSubmitting}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AuthForm;
