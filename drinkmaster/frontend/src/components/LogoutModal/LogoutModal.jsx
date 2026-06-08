import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signoutThunk } from '../../redux/auth/authOperations';
import closeIcon from '../../assets/close-icon.svg';
import s from './LogoutModal.module.css';

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleLogout = () => {
    dispatch(signoutThunk());
    onClose();
  };

  return createPortal(
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <button className={s.close} onClick={onClose} aria-label='Close'>
          <img src={closeIcon} alt='close' width={32} height={32} />
        </button>
        <p className={s.text}>Are you sure you want to log out?</p>
        <div className={s.actions}>
          <button type='button' className={s.logout} onClick={handleLogout}>Log out</button>
          <button type='button' className={s.cancel} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};
export default LogoutModal;
