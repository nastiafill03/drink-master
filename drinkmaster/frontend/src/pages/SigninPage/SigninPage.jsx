import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinThunk } from '../../redux/auth/authOperations';
import toast from 'react-hot-toast';
import AuthForm from '../../components/AuthForm/AuthForm';
import Ellips1 from '../../assets/Ellipse1.png';
import Ellips2 from '../../assets/Ellips2.png';
import welcomeBg from '../../assets/welcome-bcg.jpg';
import s from './SigninPage.module.css';

const SigninPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signinThunk(values)).unwrap();
      navigate('/home');
    } catch (err) {
      toast.error(err ?? 'Sign in failed');
      setSubmitting(false);
    }
  };

  return (
    <div className={s.page}>
      <img src={Ellips2} alt='' className={s.ellipse2} aria-hidden='true' />
      <div className={s.content}>
        <div className={s.card}>
          <h1 className={s.title}>Sign In</h1>
          <AuthForm type='signin' onSubmit={handleSubmit} />
           <p className={s.footer}>
            <Link to='/signup' className={s.link}>Sign Up</Link>
            </p>
        </div>
      </div>
      <img src={welcomeBg} alt='Welcome' className={s.image} />
      <img src={Ellips1} alt='' className={s.ellipse1} aria-hidden='true' />
    </div>
  );
};
export default SigninPage;
