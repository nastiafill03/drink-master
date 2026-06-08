import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import blurGreen from '../../assets/blur-green-modal.png';
import blurBlue from '../../assets/blur-blue-modal.png';
import s from './ModalMenu.module.css';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/drinks', label: 'Drinks' },
  { to: '/add', label: 'Add drink' },
  { to: '/my', label: 'My drinks' },
  { to: '/favorites', label: 'Favorites' },
];

const ModalMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={s.overlay}>
      <div className={s.header}>
        <Logo />
        <div className={s.headerRight}>
          <ThemeToggler />
          <button className={s.closeBtn} onClick={onClose} aria-label='Close menu'>
            <span className={s.closeIcon} />
          </button>
        </div>
      </div>

      <nav className={s.nav}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <img src={blurGreen} alt='' className={s.blurGreen} aria-hidden='true' />
      <img src={blurBlue} alt='' className={s.blurBlue} aria-hidden='true' />
    </div>
  );
};
export default ModalMenu;
