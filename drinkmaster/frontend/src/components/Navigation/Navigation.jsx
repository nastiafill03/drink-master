import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/drinks', label: 'Drinks' },
  { to: '/add', label: 'Add drink' },
  { to: '/my', label: 'My drinks' },
  { to: '/favorites', label: 'Favorites' },
];

const Navigation = () => (
  <nav className={s.nav}>
    {links.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
      >
        {label}
      </NavLink>
    ))}
  </nav>
);
export default Navigation;
