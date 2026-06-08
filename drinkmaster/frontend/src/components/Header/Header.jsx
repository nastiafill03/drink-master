import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSlice';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserLogo from '../UserLogo/UserLogo';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import ModalMenu from '../ModalMenu/ModalMenu';
import s from './Header.module.css';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={s.header}>
        <div className={s.inner}>
          <Logo />
          {isLoggedIn && <div className={s.nav}><Navigation /></div>}
          <div className={s.right}>
            <ThemeToggler />
            {isLoggedIn ? <UserLogo /> : <AuthNav />}
            {isLoggedIn && (
              <button
                className={s.burger}
                onClick={() => setMenuOpen(true)}
                aria-label='Open menu'
              >
                <span className={s.burgerIcon} />
              </button>
            )}
          </div>
        </div>
      </header>

      {isLoggedIn && (
        <ModalMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
};
export default Header;
