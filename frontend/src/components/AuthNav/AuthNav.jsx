import { Link } from 'react-router-dom';
import s from './AuthNav.module.css';

const AuthNav = ({ variant }) => {
  if (variant === 'welcome') {
    return (
      <nav className={s.welcomeNav}>
        <Link to='/signup' className={s.welcomePrimary}>Sign Up</Link>
        <Link to='/signin' className={s.welcomeSecondary}>Sign In</Link>
      </nav>
    );
  }
  return (
    <nav className={s.nav}>
      <Link to='/signin' className={s.link}>Sign In</Link>
      <Link to='/signup' className={s.btn}>Sign Up</Link>
    </nav>
  );
};
export default AuthNav;
