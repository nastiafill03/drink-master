import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';
import s from './Logo.module.css';

const Logo = ({ alwaysLight = false }) => (
  <Link to='/home'>
    {alwaysLight ? (
      <img src={logo} alt='logo' width={151} height={28} />
    ) : (
      <>
        <img src={logo} alt='logo' width={151} height={28} className={s.logoDark} />
        <img src={logoDark} alt='logo' width={151} height={28} className={s.logoLight} />
      </>
    )}
  </Link>
);
export default Logo;
