import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupThunk } from '../../redux/auth/authOperations';
import { differenceInYears } from 'date-fns';
import toast from 'react-hot-toast';
import AuthForm from '../../components/AuthForm/AuthForm';
import Ellips1 from '../../assets/Ellipse1.png';
import Ellips2 from '../../assets/Ellips2.png';
import welcomeBg from '../../assets/welcome-bcg.jpg';
import s from './SignupPage.module.css';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signupThunk({
        name: values.name,
        email: values.email,
        password: values.password,
        birthDate: values.birthDate,
      })).unwrap();

      const age = differenceInYears(new Date(), new Date(values.birthDate));
      if (age < 18) {
        toast('You will see non-alcoholic drinks only.', { icon: '🔞' });
      }
      navigate('/home');
    } catch (err) {
      toast.error(err ?? 'Sign up failed');
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <img src={Ellips2} alt='' className={s.ellipse2} aria-hidden='true' />
      <div className={s.content}>
        <div className={s.card}>
          <h1 className={s.title}>Sign Up</h1>
          <AuthForm type='signup' onSubmit={handleSubmit} />
          <Link to='/signin' className={s.link}>Sign In</Link>
        </div>
      </div>
      <img src={welcomeBg} alt='Welcome' className={s.image} />
      <img src={Ellips1} alt='' className={s.ellipse1} aria-hidden='true' />
    </div>
  );
};
export default SignupPage;
