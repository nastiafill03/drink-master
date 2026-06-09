import { Link, NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import FollowUs from '../FollowUs/FollowUs';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import s from './Footer.module.css';
import BlurFooter1 from '../../assets/blur-footer.png';
import BlurFooter2 from '../../assets/blur-footer1.png';

const footerLinks = [
  { to: '/drinks', label: 'Drinks' },
  { to: '/add', label: 'Add drink' },
  { to: '/my', label: 'My drinks' },
  { to: '/favorites', label: 'Favorites' },
];

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.inner}>
      <div className={s.left}>
        <Logo alwaysLight />
        <FollowUs alwaysLight />
      </div>

      <nav className={s.nav}>
        {footerLinks.map(({ to, label }) => (
          <NavLink key={to} to={to} className={s.link}>{label}</NavLink>
        ))}
      </nav>

      <div className={s.subscribeDesktop}>
        <SubscribeForm />
      </div>
    </div>

    <div className={s.subscribeMobile}>
      <SubscribeForm />
    </div>

    <div className={s.bottom}>
      <p className={s.copy}>© {new Date().getFullYear()} DrinkMaster. All rights reserved.</p>
      <div className={s.bottomLinks}>
        <Link to='/privacy' className={s.bottomLink}>Privacy Policy</Link>
        <Link to='/terms' className={s.bottomLink}>Terms of Service</Link>
      </div>
    </div>

    <img src={BlurFooter1} alt='' className={s.blur1} aria-hidden='true' />
    <img src={BlurFooter2} alt='' className={s.blur2} aria-hidden='true' />
  </footer>
);
export default Footer;
